import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {LoginModel} from "../models/login-model";
import {User} from "../models/user";
import {API_CONSTANTES} from "../../core/constants/API_CONSTANTES";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLogin : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _user = new BehaviorSubject<User>({} as User);

  isLoggedIn$ = this._isLogin.asObservable();
  user$ = this._user.asObservable();


  constructor(private http : HttpClient, private  router : Router) {
    // this.verifyToken()
  }

  public login(email: string, password: string) : Observable<LoginModel>{
    return this.http.post<LoginModel>(API_CONSTANTES.URI_LOGIN, {email, password}).pipe(
      tap(
        {
          next: (res)=> {
            localStorage.setItem(API_CONSTANTES.TOKEN_KEY, res.access_token);
            localStorage.setItem(API_CONSTANTES.USER_KEY, JSON.stringify(res.user));
            this._isLogin.next(true);
            this._user.next(res.user);
          },
          error: (err)=> {
            this._isLogin.next(false);
            localStorage.removeItem(API_CONSTANTES.TOKEN_KEY);
          }
        }
      )
    )

  }

  public logout() {
    this.http.get(API_CONSTANTES.URI_LOGOUT);
    localStorage.removeItem(API_CONSTANTES.TOKEN_KEY);
    this._isLogin.next(false);
  }

  public verifyToken() : Observable<boolean> {

    let  isConnected : boolean = false;
     this.http.get<any>(API_CONSTANTES.URI_USER)  . subscribe(
      {
        next: (res)=> {
          let user = res['user'] as User;
          console.log(res);
          if(user.role.name ==="admin" || user.role.name ==="moderateur"){
            this._isLogin.next(true);
            this._user.next(user);
            isConnected = true;
            this.router.navigateByUrl('/dashboard');
            // console.log(this._user.getValue());
          }else{
            this._isLogin.next(false);
            this._user.next({} as User);
            localStorage.clear();
            this.router.navigateByUrl('/login');

          }
        },
        error: (err)=> {
          this._isLogin.next(false);
          this._user.next({} as User);
          localStorage.clear();
          this.router.navigateByUrl('/login');


        },

      }
    );

     return  of(isConnected);
  }

  public isLogin() : Observable<boolean> {
    return this._isLogin.asObservable();
  }

  public  getUserValue(): User {
    return this._user.value;
  }

  public setLoginInfo(res : LoginModel) {
    localStorage.setItem(API_CONSTANTES.TOKEN_KEY, res.access_token);
    localStorage.setItem(API_CONSTANTES.USER_KEY, JSON.stringify(res.user));
    this._isLogin.next(true);
    this._user.next(res.user);
    alert("connected auth service")
  }


  public reset(){
    localStorage.clear()
    this._isLogin.next(false);
    this._user.next({} as User);
  }

  getUser() {
    this.verifyToken().subscribe()
    return this._user.getValue();
  }
}
