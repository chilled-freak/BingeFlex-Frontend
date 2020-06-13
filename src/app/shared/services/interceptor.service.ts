import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()

export class InterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest;
    if ((request.url.indexOf('/login')) > 0 || (request.url.indexOf('/signup')) > 0) {
      const contentHeader = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      });
      return next.handle(contentHeader);
    } else {
      authRequest = request.clone({
        headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('accessToken')
        })
      });
    }
    return next.handle(authRequest).pipe(tap((event: HttpEvent<any>) => {
    }, async (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log('INVALID AUTH USER');
        }
      } else {
        return next.handle(authRequest);
      }
    }));
  }
}
