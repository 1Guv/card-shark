import { Component, OnInit, Signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Header } from 'src/app/models/content';
import { MatButtonModule } from '@angular/material/button';
import { LoggedInUserService } from 'src/app/services/logged-in-user.service';
import { GoogleUser } from '../../models/users';


@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent implements OnInit {

  headerMenu$: Observable<Header>;
  loggedIn: Signal<boolean>;
  currentUser: Signal<GoogleUser>;

  constructor(
    private contentService: ContentService,
    private loggedInUserService: LoggedInUserService
  ) {

    this.loggedIn = this.loggedInUserService.getData();
    this.currentUser = this.loggedInUserService.getCurrentUser();

    this.headerMenu$ = this.contentService
      .content$
      .pipe(
        tap(content => {
          // console.log('content', content)
          // console.log('content header', content.header)
        }),
        map(content => content.header)
      ) as Observable<Header>
   }

  ngOnInit(): void {}

}
