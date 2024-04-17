import { Component } from '@angular/core';

@Component({
  selector: 'app-methods',
  standalone: true,
  imports: [],
  templateUrl: './methods.component.html',
})
export class MethodsComponent {

  capitalizeWords(word: string): string {
    return word.replace(/\b\w/g, l => l.toUpperCase());
  }

}
