import {Component, EventEmitter, input, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {ToggleEventData} from "../../models/direct-debit.model";

@Component({
  selector: 'app-card-menu',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatSlideToggle,
    MatMenuTrigger,
    FormsModule
  ],
  templateUrl: './card-menu.component.html',
  styleUrl: './card-menu.component.scss'
})
export class CardMenuComponent {
  @Input() item!: any;
  @Input() toggleEnabled = false;
  @Output() editItem = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  @Output() toggleItem = new EventEmitter();

  onEditItem(item: any) {
    this.editItem.emit(item);
  }

  onEnable(event: MatSlideToggleChange, item: any) {
    let data: ToggleEventData = {
      event: event,
      item: item
    }
    this.toggleItem.emit(data);
  }

  deleteDirectDebit(itemId: string) {
    this.deleteItem.emit(itemId);
  }
}
