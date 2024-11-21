import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {Observable, map, Subscription} from 'rxjs';
import { HomeCTA } from 'src/app/models/content';
import { ContentService } from 'src/app/services/content.service';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home-cta',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './home-cta.component.html',
  styleUrl: './home-cta.component.scss'
})
export class HomeCtaComponent implements OnDestroy {

  currentUser: any;
  homeCTA$: Observable<HomeCTA>;
  amexReferralLink = 'https://www.americanexpress.com/en-gb/referral/intl/ba-classic-credit?CORID=g~U~R~V~I~S~A~G~N~3-1723634348316-1821145434&CPID=100357009&GENCODE=349993189337799&XL=MNMNS&ref=gURVISAGN3&v=2';
  subs = new Subscription();

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
  ) {
    this.homeCTA$ = this.contentService
      .content$
      .pipe(
        map(content => content.homeCTA)
      ) as Observable<HomeCTA>

    this.subs.add(
      this.authService
        .currentUser$
        .pipe(
          map((user: any) => this.currentUser = user)
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
