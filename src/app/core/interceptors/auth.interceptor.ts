import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {API_CONSTANTES} from "../constants/API_CONSTANTES";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("access_token");
    const isApiUrl = req.url.startsWith(environment.apiUrl);
    if (idToken && isApiUrl) {
      const cloned = req.clone({
        headers: req.headers
          .set("Authorization", "Bearer " + idToken)
      });
      return next.handle(cloned);
    }
    else {
      const cloned2 = req.clone({
        headers: req.headers
        // .set("countryCode",this.paysService.getPaysFromLocal() ? this.paysService.getPaysFromLocal().code : 'sn')
        //add country to header
      });
      return next.handle(cloned2);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
