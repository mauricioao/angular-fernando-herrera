// import { CanActivateFn, Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private route: Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean>{
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if( !isAuthenticated ){
            this.route.navigate(['./auth/login']);
          }
        })
      )
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    // console.log('CanActivate');
    // console.log({ route, state });
    // return true;
    return this.checkAuthStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    // console.log('CanMatch');
    // console.log({ route, segments });
    // return true;
    return this.checkAuthStatus();
  }

}
