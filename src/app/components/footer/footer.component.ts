import { AsyncPipe, JsonPipe, NgClass, NgFor, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
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
export class FooterComponent implements OnInit{

  footer$: Observable<Footer>;

  constructor(
    private contentService: ContentService
  ) {
    this.footer$ = this.contentService
      .content$
      .pipe(
        map(content => content.footer)
      ) as Observable<Footer>;
   }

  ngOnInit(): void {

  }


}
