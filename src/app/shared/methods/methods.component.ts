import { Component } from '@angular/core';

@Component({
  selector: 'app-methods',
  standalone: true,
  imports: [],
  templateUrl: './methods.component.html',
})
export class MethodsComponent {

  capitalizeFirstLetter(word: string) {
    return  word[0].toUpperCase() + word.slice(1);
  }

}
