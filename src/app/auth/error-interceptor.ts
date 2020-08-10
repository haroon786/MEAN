import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import  {MatDialog} from '@angular/material';
import {ErrorComponent} from '../error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private dailog:MatDialog){}

  intercept(req:HttpRequest<any>,next:HttpHandler)
  {
      return next.handle(req).pipe(
        catchError((error:HttpErrorResponse)=>
        {

            this.dailog.open(ErrorComponent)
            return throwError(error)
        })
      )
  }
}
