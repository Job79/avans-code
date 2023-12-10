import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor, IsAdmin, IsLoggedIn} from "@avans-code/ui/auth";
import {ErrorInterceptor} from "./error/error.interceptor";
import {ErrorService} from "./error/error.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    ErrorService,
    IsLoggedIn,
    IsAdmin,
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
};
