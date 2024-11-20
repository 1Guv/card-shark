import {AsyncPipe, NgClass, NgFor, NgIf, NgOptimizedImage} from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Section } from 'src/app/models/content';
import { HomeCtaComponent } from '../home-cta/home-cta.component';
import { map, Observable } from 'rxjs';
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
    AsyncPipe,
    NgOptimizedImage
  ],
  templateUrl: './cta-content-cards.component.html',
  styleUrl: './cta-content-cards.component.scss'
})
export class CtaContentCardsComponent {
  sectionData$: Observable<Array<Section>>;

  constructor(
    private contentService: ContentService
  ) {
    this.sectionData$ = this.contentService
      .content$
      .pipe(
        map(content => content.homeCTA?.howItWorks)
      ) as Observable<Array<Section>>
   }

}
