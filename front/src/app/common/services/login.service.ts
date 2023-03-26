import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiRequest, ApiResponse } from '../models/api.model';
import { ApiService } from './api.service';
import jwt_decode from 'jwt-decode';
import { User, UserPopulated } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public webLogo?: string = undefined;

  constructor(private apiService: ApiService) {
    console.log('constructor loginService');
  }

  login(data: any): Observable<ApiResponse<User>> {
    const request = new ApiRequest();
    request.filters = data;
    request.data = sessionStorage['lang']
    const url = 'api/users/sign-in';

    return this.apiService.post(url, request).pipe(
      tap(rtn => {
        if (rtn.extra && rtn.extra.accessToken) {
          sessionStorage.setItem('x-access-token', rtn.extra.accessToken);
        }
      })
    );
  }

  getUser(): Observable<UserPopulated> {
    const token = sessionStorage.getItem('x-access-token');
    return of(this.decodeToken(token));
  }

  decodeToken(token: string | null): any {
    let rtn = null;
    if (token) {
      try {
        rtn = jwt_decode(token);
      }
      catch (error) {
        console.error(error);
      }
    }
    return rtn;
  }

}
