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
  isLoading : boolean = false

  loginForm : any;
  constructor(private authService: AuthService, private  router : Router, private toastr: ToastrService) {
    this.loginForm = new FormGroup(
      {
        'email': new FormControl('', [Validators.email]),
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
          this.toastr.success('Login Successful', 'Success');
          this.router.navigateByUrl('/dashboard').then(r => {
          });
        },
        error : (err)=> {
          this.error = true;
          this.isLoading = false;
        },
        complete : () => {
          this.isLoading = false;
        }
      }
    );
  }

}
