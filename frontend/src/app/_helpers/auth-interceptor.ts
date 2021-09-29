import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const authToken = this._auth.token;
    const authToken = JSON.parse(localStorage.getItem("token"))
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(newRequest);
  }
}