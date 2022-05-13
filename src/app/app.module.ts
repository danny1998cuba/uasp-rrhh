import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-ES" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
