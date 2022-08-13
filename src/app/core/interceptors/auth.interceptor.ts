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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toastr : ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(API_CONSTANTES.TOKEN_KEY)
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }
    return next.handle(request) .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        // alert(errorMessage);
        // this.toastr.error(error.message);
        return throwError(()=> errorMessage);
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
