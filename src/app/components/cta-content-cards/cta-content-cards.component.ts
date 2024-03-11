import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Section } from 'src/app/models/content';

@Component({
  selector: 'app-cta-content-cards',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './cta-content-cards.component.html',
  styleUrl: './cta-content-cards.component.scss'
})
export class CtaContentCardsComponent {

  @Input() sectionData: Array<Section> | null = [];

  constructor() {
    // this.sectionData = [];
  }

}
