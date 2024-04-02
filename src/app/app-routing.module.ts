import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CtaContentCardsComponent } from './components/cta-content-cards/cta-content-cards.component';

const routes: Routes = [
  { path: '', component: CtaContentCardsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: CtaContentCardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
