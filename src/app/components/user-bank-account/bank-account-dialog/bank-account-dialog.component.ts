import {Component, Inject} from '@angular/core';
import {ukBanks} from "../../../models/banks.model";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-bank-account-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    MatDialogClose,
    JsonPipe
  ],
  templateUrl: './bank-account-dialog.component.html',
  styleUrl: './bank-account-dialog.component.scss'
})
export class BankAccountDialogComponent {
  protected readonly ukBanksList = ukBanks;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  formatSortCode() {
    let currentSortCode = this.data.form.get('sortCode')?.value;
    currentSortCode = currentSortCode.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1-');
    if (currentSortCode.length >= 8) {
      this.data.form.get('sortCode')?.setValue(currentSortCode.slice(0, 8));
    }
  }
}
