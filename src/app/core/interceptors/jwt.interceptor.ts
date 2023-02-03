import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {API_CONSTANTES} from "../constants/API_CONSTANTES";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
   intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
   ): Observable<HttpEvent<unknown>> {
      // add JWT auth header if a user is logged in for API requests
      const accessToken = localStorage.getItem(API_CONSTANTES.TOKEN_KEY);
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (accessToken && isApiUrl) {
         request = request.clone({
            setHeaders: { Authorization: `Bearer ${accessToken}` },
         });
      }

      return next.handle(request);
   }
}
