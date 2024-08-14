import {Component, Inject} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {JsonPipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";

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
    MatDialogClose
  ],
  template: `
    <mat-card>
      <div class="mx-2 my-2">
        <mat-card-header>
          <mat-card-title>Add Direct Debit</mat-card-title>
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

                  <mat-form-field appearance="fill">
                    <mat-label>Next Date due</mat-label>
                    <input matInput placeholder="Fill in next due date" formControlName="nextDue">
                  </mat-form-field>

                  <mat-form-field appearance="fill">
                    <mat-label>Bank name</mat-label>
                    <input matInput placeholder="Fill in bank name" formControlName="bankName">
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
            ADD
          </button>
        </mat-card-actions>
      </div>
    </mat-card>
  `,
  styleUrl: './direct-debits-dialog.component.scss'
})
export class DirectDebitsDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

}
