import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject, finalize, Observable, of, tap} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {LoginResponse, LoginResponsePayload} from "../data/LoginResponse";
import {Creator} from "../../data/models/creator";
import { User } from 'src/app/data/models/user';
import {API_CONSTANTES} from "../constants/API_CONSTANTES";


@Injectable({
  providedIn: 'root'
})
export class AuthServiceJwt {
  protected apiUrl: string = environment.apiUrl;

  private _tokenName = API_CONSTANTES.TOKEN_KEY

  private _connectedVendor: BehaviorSubject<LoginResponsePayload> = new BehaviorSubject(null);

  connectedUser$ : Observable<LoginResponsePayload> = of(this.getUserConnectedInfo());

  creator$ : Observable<Creator> = this.http.get<Creator>(`${this.apiUrl}jwt/me`);
  user$ : Observable<User> = this.http.get<User>(`${this.apiUrl}jwt/me`);

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}jwt/login`, { email, password }).pipe(
      tap(
        next => {
          this.setSession(next);
          this._connectedVendor.next(this.getUserConnectedInfo());
        }
      )
    );
  }

  register(data: any) {
    return this.http.post<LoginResponse>(`${this.apiUrl}clients`,data).pipe(
      tap(
        next => {
          this.setSession(next);
          this._connectedVendor.next(this.getUserConnectedInfo());
        },
      )
    );
  }

  private setSession(authResult: LoginResponse) {
    // Set the time that the access token will expire moment
    localStorage.setItem(this._tokenName, authResult.access_token);
  }

  clearLocalStorage() {
    localStorage.clear();
    this._connectedVendor.next(null);
  }

  logout() {
    this.http
      .post<unknown>(`${this.apiUrl}/jwt/logout`, {})
      .pipe(
        finalize(() => {
          this.clearLocalStorage();
          // this.stopTokenTimer();
          this.router.navigate(['/se-connecter']);
        })
      ).subscribe();
  }

  public isLoggedIn() : boolean {
    // Check if current date is greater than expiration for access token and verify if token is present
    let isExpired = this.getExpiration();
    if (isExpired && this._isAdmin()) {
      return moment().isBefore(isExpired);
    }
    return false;
  }

  getExpiration() : moment.Moment {
    const token = localStorage.getItem(this._tokenName);
    if(!token) {
      return null;
    }
    //get payload from token
    const payload = token.split('.')[1];
    //decode payload to json
    const infos = JSON.parse(atob(payload));
    const expiresAt = infos.exp;
    return moment.unix(expiresAt);
  }

  _isCreator() : boolean {
    return this.getUserConnectedInfo().role === 'creator';
  }

  _isAdmin() : boolean {
    return this.getUserConnectedInfo().role === 'admin';
  }

  forgotPassword(email: string) {
    //save email on localStorage
    localStorage.setItem('email_reset', email);
    return this.http.post(`${this.apiUrl}/auth/password/forget`, {email});
  }
  sendotp(otp: string) {
    let email = localStorage.getItem('email_reset');
    return this.http.post(`${this.apiUrl}/auth/password/otp/verif`, {email, otp});
  }

  updatePassword(vendeur: any){
    let url = `${this.apiUrl}` + '/auth/password/update';
    return this.http.post(url, vendeur);
  }

  public  getUserConnectedInfo() : LoginResponsePayload {
    const token = localStorage.getItem(this._tokenName);
    if(!token) {
      return null;
    }
    //get payload from token
    const payload = token.split('.')[1];
    //decode payload to json
    const infos = JSON.parse(atob(payload));
    return infos as LoginResponsePayload;
  }


  public updateClient(client: any,id : number) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}clients/${id}`, client);
  }

  resetPassword(value) : Observable<any>{
    return this.http.post<any>(`${this.apiUrl}jwt/reset-password`, value);
  }

  updateCreator(creator: any,id : number) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}creators/${id}`, creator).pipe(
      tap(
        next => {
          this._connectedVendor.next(this.getUserConnectedInfo());
          this.creator$ = this.http.get<Creator>(`${this.apiUrl}jwt/me`);
        }
    ));
  }
}
