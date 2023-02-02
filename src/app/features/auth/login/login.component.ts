import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../data/services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {tap} from "rxjs";
import {AuthServiceJwt} from "../../../core/services/AuthServiceJwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  isLoading : boolean = false

  loginForm : any;
  constructor(private authService: AuthService, private  router : Router, private toastr: ToastrService, private _jwtAuthService : AuthServiceJwt) {

    this.loginForm = new FormGroup(
      {
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required]),
      }
    )
  }

  ngOnInit(): void {
    // this.authService.verifyToken();
    if(this._jwtAuthService.isLoggedIn()) {
      this.router.navigate(['/dashboard']).then(r => console.log(r));
    }
  }

  public showHidePassword() {
    this.show = !this.show;
  }

  public onSubmit() {
    this.isLoading = true;
    this.error = false;

    this._jwtAuthService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      {
        next: (res)=> {
          console.log(res)
          this.isLoading = false;
          if(res.user.role.name==='admin'){
            this.router.navigateByUrl('/dashboard').then(r => {
              this.toastr.success('Login Successful', 'Success');
            });
          }else{
            this.error = true;
            this.errorMessage = "vous n'avez pas les droits pour accéder à cette page"
          }

        },
        error : (err)=> {
          this.error = true;
          this.isLoading = false;
          this.errorMessage = "identifiants incorrects";
          console.log(err)
        },
        complete : () => {
          this.isLoading = false;
        }
      }
    );
  }

  public validateFormControlName(controlName: string) {
    if(this.loginForm.get(controlName).valid && (this.loginForm.get(controlName).touched||this.loginForm.get(controlName).dirty))
    {
      return 'is-valid';
    }
    else if(this.loginForm.get(controlName).invalid && (this.loginForm.get(controlName).touched||this.loginForm.get(controlName).dirty)){
      return  'is-invalid'
    }else{
      return ''
    }

  }


}
