import { Observable, map, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ContentService } from './services/content.service';
import { Section } from './models/content';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Card Shark';

  // howItWorks$: Observable<Array<Section>>;

  constructor(
    private contentService: ContentService
  ) {
    Amplify.configure(outputs);
    // this.howItWorks$ = this.contentService
    //   .content$
    //   .pipe(
    //     tap(content => {
    //       console.log('content', content)
    //     }),
    //     map(content => content.homeCTA?.howItWorks)
    //   ) as Observable<Array<Section>>
   }

  ngOnInit(): void {

  }



}
