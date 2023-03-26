
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpErrorResponse, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptor {
  token?: string | null;
  constructor(
    private router: Router,
    ) {

    }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let headers = new HttpHeaders();
    
    const token = sessionStorage.getItem('x-access-token');
    if (token) {
      headers = headers.append('x-access-token', '' + token);
    }
    const clonedRequest = request.clone({
      headers
    });


    return next.handle(clonedRequest)
      .pipe(
        tap((event: any) => {
          if (event instanceof HttpResponse) {
            if (event.hasOwnProperty('body')) {
              const response = event.body;
              if (response.return_code === 1 && response.session_id === -1) {
                sessionStorage.removeItem('x-access-token');
                this.router.navigate(['/login']);
              }
            }
          }
        },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              // tslint:disable-next-line: max-line-length
              if (err.status === 403 || err.status === 401) {
                sessionStorage.removeItem('x-access-token');
                this.router.navigate(['/login']);
              }
            }
          })
      );
  }

   removeSessionItem(key: any) {
     sessionStorage.removeItem(key);
   }

   logout() {
     this.removeSessionItem('x-access-token');
     this.token = null;
     this.router.navigate(['/login']);
   }

   getParsedToken() {
     if (this.token) {
       return JSON.parse(this.token);
     }
   }
}

