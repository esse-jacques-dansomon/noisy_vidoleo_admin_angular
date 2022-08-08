import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {LoginModel} from "../models/login-model";
import {User} from "../models/user";
import {API_CONSTANTES} from "../../core/constants/API_CONSTANTES";

@Injectable({
  providedIn: 'root'
})
export class
AuthService {

  private _isLogin : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _user : BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private http : HttpClient) { }

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
            this._user.next(null);
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
    this._user.next(null);
  }

  public verifyToken() : Observable<User> {
    return this.http.get<User>(API_CONSTANTES.URI_USER).pipe(
      tap(
        {
          next: (res)=> {
            this._isLogin.next(true);
            this._user.next(res);
          },
        }
      )
    )
  }

  public isLogin() : Observable<boolean> {
    return this._isLogin.asObservable();
  }

  public getUser() : Observable<any> {
    return this._user.asObservable();
  }
  public  getUserValue(): User {
    return this._user.getValue();
  }

  public setUser(user : User) {
    this._user.next(user);
  }
}
