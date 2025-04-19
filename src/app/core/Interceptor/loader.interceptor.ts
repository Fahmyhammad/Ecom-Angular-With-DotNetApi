import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { LoadingService } from '../Services/loading.service';
import { request } from 'http';

@Injectable()
export class loaderInterceptor implements HttpInterceptor {
  constructor(private _service:LoadingService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): 
  Observable<HttpEvent<any>> {
    this._service.loading();
    return next.handle(req).pipe(
      delay(1000),
      finalize(()=>{
        this._service.hideLoader();
      })
    )
  }

};
