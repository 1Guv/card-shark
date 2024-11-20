import {Component, Inject} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {JsonPipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ukBanks} from "../../../../models/banks.model";

@Component({
  selector: 'app-direct-debits-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    JsonPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatIcon,
    MatDialogClose,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  template: `
    <mat-card>
      <div class="mx-2 my-2">
        <mat-card-header>
          @if (data.add) {
            <mat-card-title>Add Direct Debit</mat-card-title>
          }

          @if (data.edit) {
            <mat-card-title>Edit Direct Debit</mat-card-title>
          }

        </mat-card-header>
        <mat-card-content>
          <div class="my-3 p-3 shadow rounded">
            <form [formGroup]="data.form">
              <div class="d-flex flex-column justify-content-between">
                  <mat-form-field appearance="fill">
                    <mat-label>Company Name</mat-label>
                    <input matInput placeholder="Fill in Company Name" formControlName="companyName">
                  </mat-form-field>

                  <mat-form-field appearance="fill">
                    <mat-label>Reference</mat-label>
                    <input matInput placeholder="Fill in payment reference" formControlName="ref">
                  </mat-form-field>

                  <mat-form-field appearance="fill">
                    <mat-label>Reference Two (Optional)</mat-label>
                    <input matInput placeholder="Fill in optional second reference" formControlName="ref2">
                  </mat-form-field>

                  <mat-form-field appearance="fill">
                    <mat-label>Direct Debit Amount</mat-label>
                    <input matInput placeholder="Fill in direct debit amount" formControlName="ddAmount">
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Next Date due</mat-label>
                    <input matInput [matDatepicker]="picker" formControlName="nextDue">
<!--                    <mat-hint>MM/DD/YYYY</mat-hint>-->
                    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                  </mat-form-field>

<!--                  <mat-form-field appearance="fill">-->
<!--                    <mat-label>Bank name</mat-label>-->
<!--                    <input matInput placeholder="Fill in bank name" formControlName="bankName">-->
<!--                  </mat-form-field>-->

                  <mat-form-field>
                    <mat-label>Banks</mat-label>
                    <mat-select formControlName="bankName" required>
                      <mat-option>--</mat-option>
                      @for (bank of ukBanksList; track bank) {
                        <mat-option [value]="bank">{{bank}}</mat-option>
                      }
                    </mat-select>
                  </mat-form-field>
              </div>
            </form>
          </div>
        </mat-card-content>
        <mat-card-actions class="d-flex flex-row-reverse">
          <button
            mat-raised-button color="primary"
            [disabled]="data.form.invalid"
            [mat-dialog-close]="data.form" cdkFocusInitial
          >
            SAVE
          </button>
        </mat-card-actions>
      </div>
    </mat-card>
  `,
  styleUrl: './direct-debits-dialog.component.scss'
})
export class DirectDebitsDialogComponent {

  ukBanksList= ukBanks;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

}
