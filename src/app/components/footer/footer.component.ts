import { AsyncPipe, JsonPipe, NgClass, NgFor, NgForOf } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {Observable, map, tap, Subscription} from 'rxjs';
import { Footer } from 'src/app/models/content';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    RouterModule,
    NgClass,
    JsonPipe,
    MatButtonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {

  footer$: Observable<Footer>;
  subs: Subscription[] = [];
  referralOfferLink = 'https://www.americanexpress.com/en-gb/referral/intl/ba-classic-credit?CORID=g~U~R~V~I~S~A~G~N~3-1723634348316-1821145434&CPID=100357009&GENCODE=349993189337799&XL=MNMNS&ref=gURVISAGN3&v=2'

  constructor(
    private contentService: ContentService
  ) {
    // this.footer$ = this.contentService
    //   .content$
    //   .pipe(
    //     map(content => content.footer)
    //   ) as Observable<Footer>;
    this.footer$ = this.contentService
      .content$
      .pipe(
        map((content) => content.footer)
      ) as Observable<Footer>;
   }

  ngOnInit(): void {}

  onClickFooterButton(buttonName: string) {
    this.subs.push(
      this.footer$
        .pipe(
          map((footer: Footer) => {
            footer.ctaButtons[1].name
            if (buttonName === footer.ctaButtons[1].name) {
              window.open(this.referralOfferLink, '_blank');
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }
}
