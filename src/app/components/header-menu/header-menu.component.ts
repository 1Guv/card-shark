import {Component, OnInit, signal, Signal} from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import {Router, RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import {Header, HeaderMenuOptions} from 'src/app/models/content';
import { MatButtonModule } from '@angular/material/button';
import {AuthService} from "../../services/auth.service";

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
export class HeaderMenuComponent {

  currentUser= signal<any>({});
  loggedIn = signal(false);
  headerMenu$: Observable<Header>;

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.headerMenu$ = this.contentService
      .content$
      .pipe(
        map(content => content.header)
      ) as Observable<Header>

    this.authService
      .currentUser$
      .pipe(
        map((user: any) => {
          this.loggedIn.set(!!user?.email);
          this.currentUser.set(user);
        })
      )
      .subscribe();
   }

   async logout(option: HeaderMenuOptions): Promise<void> {
    if (option.name === 'Logout') {
      await this.authService.logout();
      await this.router.navigateByUrl('');
    } else {
      await this.router.navigateByUrl(option.url);
    }
   }
}
