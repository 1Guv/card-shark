import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { HomeCTA } from 'src/app/models/content';
import { ContentService } from 'src/app/services/content.service';

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
export class HomeCtaComponent implements OnInit, OnDestroy {

  homeCTA$: Observable<HomeCTA>;

  constructor(private contentService: ContentService) {
    this.homeCTA$ = this.contentService
      .content$
      .pipe(
        map(content => content.homeCTA)
      ) as Observable<HomeCTA>
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

}
