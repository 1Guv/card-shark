import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Section } from 'src/app/models/content';
import { HomeCtaComponent } from '../home-cta/home-cta.component';
import { tap, map, Observable } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-cta-content-cards',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    RouterModule,
    MatButtonModule,
    HomeCtaComponent,
    AsyncPipe
  ],
  templateUrl: './cta-content-cards.component.html',
  styleUrl: './cta-content-cards.component.scss'
})
export class CtaContentCardsComponent {

  // @Input() sectionData: Array<Section> | null = [];
  // howItWorks$: Observable<Array<Section>>;
  sectionData$: Observable<Array<Section>>;
  // sectionData: Array<Section> | null = [];

  constructor(
    private contentService: ContentService
  ) {
    this.sectionData$ = this.contentService
      .content$
      .pipe(
        tap(content => {
          console.log('content', content)
        }),
        map(content => content.homeCTA?.howItWorks)
      ) as Observable<Array<Section>>
   }

}
