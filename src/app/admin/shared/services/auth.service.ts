import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, User } from "src/app/shared/interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string {

    const expDate = new Date(localStorage.getItem('fb-token-exp')!);

    if (new Date() > expDate) {
      this.logout();
    }

    const token = localStorage.getItem('fb-token') || ''

    return token;
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Неверный email');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный пароль');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Email не найден')
        break;
    }

    return throwError(error);
  }

  private setToken(response: FbAuthResponse | any) {
    if (response) {
      const time = new Date().getTime() + +response.expiresIn * 1000;
      const expDate = new Date(time);

      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
