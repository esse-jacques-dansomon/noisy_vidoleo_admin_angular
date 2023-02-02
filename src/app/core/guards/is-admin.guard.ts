import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../../data/services/auth.service";
import {AuthServiceJwt} from "../services/AuthServiceJwt";

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthServiceJwt) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    {
      if (this.authService.isLoggedIn()) {
        return  true;
      } else {
        this.router.navigate(['/'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    }
  }

}
