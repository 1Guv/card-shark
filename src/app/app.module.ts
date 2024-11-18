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

const firebaseConfig = {
  apiKey: "AIzaSyDw-BcCYPJuvZW7FfTOoGSBzzilKPaeNmY",
  authDomain: "card-shark-1.firebaseapp.com",
  projectId: "card-shark-1",
  storageBucket: "card-shark-1.firebasestorage.app",
  messagingSenderId: "78889961943",
  appId: "1:78889961943:web:2e4625050f982a66b16392",
  measurementId: "G-60RF163VQ8"
  // apiKey: 'AIzaSyAeVTNW-XFjN43u1THCQaSImh5l6-gDmVk',
  // authDomain: 'login-crud-test.firebaseapp.com',
  // projectId: 'login-crud-test',
  // storageBucket: 'login-crud-test.firebasestorage.app',
  // messagingSenderId: '500388906751',
  // appId: '1:500388906751:web:7b64c4cc2e59f70e2caeca',
  // measurementId: 'G-YQ7P50KRDV',
};

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
    FooterComponent
  ],
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
