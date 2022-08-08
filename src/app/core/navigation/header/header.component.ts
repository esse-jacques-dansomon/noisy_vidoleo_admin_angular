import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../data/services/auth.service";
import {API_CONSTANTES} from "../../constants/API_CONSTANTES";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  $isLogin = false;
  user$ = this.authService.getUser();
  constructor(private authService : AuthService, private router :Router) { }

  ngOnInit(): void {
    this.authService.isLogin().subscribe(
      {
        next : (value) =>{
          if(value){
            alert(this.authService.getUserValue().first_name);
            this.$isLogin = true;
          }else{
            if(localStorage.getItem(API_CONSTANTES.TOKEN_KEY)){
              this.authService.verifyToken().subscribe(
                {
                  next : (value) =>{
                    this.authService.setUser(value);
                    this.$isLogin = true;
                  },
                  error : (err) =>{
                    localStorage.removeItem(API_CONSTANTES.TOKEN_KEY);
                    this.$isLogin = false;
                    this.router.navigateByUrl('/login');
                  }
                }
              )
            }
            this.$isLogin = false;
          }
        },
        error : (value) =>{
          this.$isLogin = false;

        },
      }
    )
  }

}
