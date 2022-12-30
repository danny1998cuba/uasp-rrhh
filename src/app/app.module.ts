import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthComponent } from './modules/auth/auth.component';
import { CookieService } from 'ngx-cookie-service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { RestoreFormComponent } from './modules/auth/restore-form/restore-form.component';
import { SesionComponent } from './modules/sesion/sesion.component';
import { UnauthorizedComponent } from './modules/unauthorized/unauthorized.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthInterceptor } from './core/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    NavbarComponent,
    FooterComponent,
    AuthComponent,
    RestoreFormComponent,
    SesionComponent,
    UnauthorizedComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-ES" },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'CUP' },
    { provide: MatBottomSheetRef, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
