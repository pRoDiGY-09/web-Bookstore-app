import { Injectable } from "@angular/core";
import { Router,CanActivate, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "../services/account.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor (private acc: AccountService, private router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.acc.loggedin()) {
      return true;
    }
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
    }
}
    
