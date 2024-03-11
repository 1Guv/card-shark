import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeCtaComponent } from './components/home-cta/home-cta.component';
import { CtaContentCardsComponent } from './components/cta-content-cards/cta-content-cards.component';

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
    CtaContentCardsComponent
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
