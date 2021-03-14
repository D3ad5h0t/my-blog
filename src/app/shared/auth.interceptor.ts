import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../admin/shared/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }

    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('[Interceptor Error]: ', error);

        if (error.status == 401) {
          this.auth.logout();
          this.router.navigate(['/admin', 'login'], {
            queryParams: {
              authFaild: true
            }
          })
        }

        return throwError(error)
      })
    );
  }
}
