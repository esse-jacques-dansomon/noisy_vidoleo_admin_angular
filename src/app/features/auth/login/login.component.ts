import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../data/services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
  constructor(private authService: AuthService, private  router : Router, private toastr: ToastrService) {
    this.authService.verifyToken().subscribe(
      {
      next: (isLoggedIn) => {
      if (isLoggedIn.role.name=='admin') {
        this.router.navigate(['/dashboard']);
      }else{
        localStorage.clear();
        this.router.navigate(['/']);
      }
    },
    error :(err) => {
      localStorage.clear();
    }
      }
    );
    this.loginForm = new FormGroup(
      {
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required]),
      }
    )
  }

  ngOnInit(): void {}

  public showHidePassword() {
    this.show = !this.show;
  }

  public onSubmit() {
    this.isLoading = true;
    this.error = false;

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      {
        next: (res)=> {
          this.isLoading = false;
          if(res.user.role.name==='admin'){
            this.toastr.success('Login Successful', 'Success');
            this.router.navigateByUrl('/dashboard').then(r => {
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
