import { Observable, map, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ContentService } from './services/content.service';
import { Section } from './models/content';

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
   }

  ngOnInit(): void {

  }



}
