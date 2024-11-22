import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeCtaComponent } from './components/home-cta/home-cta.component';
import { CtaContentCardsComponent } from './components/cta-content-cards/cta-content-cards.component';
import { FooterComponent } from './components/footer/footer.component';
import {provideRouter} from "@angular/router";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAnalytics, provideAnalytics} from "@angular/fire/analytics";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderMenuComponent,
    HttpClientModule,
    HomeCtaComponent,
    CtaContentCardsComponent,
    FooterComponent,
    MatNativeDateModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics()),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
