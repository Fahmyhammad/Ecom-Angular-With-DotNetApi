// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module'; 
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ShopModule } from './shop/shop.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { RouterLink } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { loaderInterceptor } from './core/Interceptor/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule ,
    HomeModule,
    RouterLink,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton:true,
      positionClass:'toast-top-right',
      countDuplicates:true,
      timeOut:1500,
      progressBar:true
    }),
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    {provide:HTTP_INTERCEPTORS,useClass:loaderInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
