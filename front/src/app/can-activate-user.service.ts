import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoginService } from './common/services/login.service';

const urlToPermission: any = {
  'dashboard': 'DASHBOARD',
}

@Injectable({
  providedIn: 'root'
})
export class CanActivateUserService implements CanActivate {

  constructor(private loginService: LoginService, private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.getUser()) {
        return true;
    }
    this.route.navigate(['./login']);
    return false;
  }
}