import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
  private _user = new BehaviorSubject<User>({} as User);

  isLoggedIn$ = this._isLogin.asObservable();
  user$ = this._user.asObservable();


  constructor(private http : HttpClient) {
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

  public verifyToken() : Observable<User> {
    let token = localStorage.getItem(API_CONSTANTES.TOKEN_KEY);
    if (token == '' || token == null){
      token ='';
    }
    const header = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json'
    });
    return this.http.get<User>(API_CONSTANTES.URI_USER,  {headers: header, } ).pipe(
      tap(
        {
          next: (res)=> {
            if(res.role.name==="admin"){
              this._isLogin.next(true);
              this._user.next(res);
              alert(res.role.name);
              // console.log(this._user.getValue());
            }else{
              this._isLogin.next(false);
              this._user.next({} as User);
              localStorage.clear();
              alert("vous n'avez pas les droits pour accéder à cette page 1");
            }
          },

          error: (err)=> {
            this._isLogin.next(false);
            this._user.next({} as User);
            localStorage.clear();
            alert("vous n'avez pas les droits pour accéder à cette page 2");

          },

          complete: ()=> {
            alert("complete");
          }

        }
      )
    )
  }

  public isLogin() : Observable<boolean> {
    return this._isLogin.asObservable();
  }

  public  getUserValue(): User {
    return this._user.value;
  }

  public setUser(user : User) {
    this._user.next(user);
  }

  getUser() {
    this.verifyToken().subscribe(
      (res) => {
        if(res.role.name==='Admin'){
          this._user.next(res);
          this._isLogin.next(true);
        }else{
          this._user.next({} as User);
          this._isLogin.next(false);
        }
      }
    )
    return this._user.getValue();
  }
}
