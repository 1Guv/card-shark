import {Component, input, OnDestroy, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {map, of, Subscription, tap} from 'rxjs';
import {DirectDebit} from 'src/app/models/cards';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DirectDebitsDialogComponent} from "./direct-debits-dialog/direct-debits-dialog/direct-debits-dialog.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {DirectDebitService} from "../../services/direct-debit.service";
import {AuthService} from "../../services/auth.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-account-current-direct-debits',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    DatePipe
  ],
  template: `
    <mat-card class="my-3">
          <div class="mx-2 my-2 card-one">
              <mat-card-header>
                  <mat-card-title>Direct Debits</mat-card-title>
                  <mat-card-subtitle>
                      You have {{ currentDirectDebits().length }} direct debits / subscriptions
                  </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>

                <div class="my-3 p-3 shadow rounded bg-warning">
                  <h2>Summary:</h2>

                  <p><span class="summary-tag">All Total:</span> {{ allTotal }}</p>
                  <p><span class="summary-tag">Total Enabled:</span> {{ enabledTotal }}</p>
                  <p><span class="summary-tag">Total Disabled:</span> {{ allTotal - enabledTotal }}</p>
                </div>

                @for (directDebit of currentDirectDebits(); track $index) {
                  <div class="my-3 p-3 shadow rounded">
                        <div class="d-flex flex-row-reverse">
                          <button mat-mini-fab aria-label="Delete direct debit" (click)="deleteDirectDebit(directDebit.id)">
                            <mat-icon>delete</mat-icon>
                          </button>
                        </div>

                        <p><mat-slide-toggle (change)="onDirectDebitEnabled($event, directDebit.ddAmount)" labelPosition="before" [(ngModel)]="directDebit.ddEnabled"></mat-slide-toggle></p>
                        <p><span class="tag">Company:</span> {{ directDebit.companyName }}</p>
                        <p><span class="tag">Reference:</span> {{ directDebit.ref }}</p>
                        <p><span class="tag">Personal Ref:</span> {{ directDebit.refTwo }}</p>
                        <p><span class="tag">Amount:</span> £{{ directDebit.ddAmount }}</p>
                        <p><span class="tag">Bank name:</span> {{ directDebit.bankName }}</p>
                        <p><span class="tag">Last paid:</span> {{ directDebit.lastPaid }}</p>
                        <p><span class="tag">Next payment:</span> {{ convertTsToDate(directDebit.nextDue) }}</p>
                        <button mat-raised-button color="primary" (click)="onEditDirectDebit(directDebit, directDebit.id)" class="edit-btn">Edit</button>
                    </div>
                }
              </mat-card-content>
              <mat-card-actions>
                  <button mat-raised-button color="primary" (click)="openDirectDebitDialog()">ADD DIRECT DEBIT</button>
              </mat-card-actions>
          </div>
      </mat-card>
  `,
  styleUrl: './user-account-current-direct-debits.component.scss'
})

export class UserAccountCurrentDirectDebitsComponent implements OnInit, OnDestroy {

  currentUser = input<any>();
  currentDirectDebits = signal<Array<DirectDebit>>([]);
  addDirectDebitForm: FormGroup = new FormGroup({});
  allTotal: number = 0;
  enabledTotal: number = 0;
  directDebits: Array<DirectDebit> = [];
  subs = new Subscription();

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private directDebitService: DirectDebitService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.createAddDDForm();
    this.getDirectAllDebits();
    this.calcTotals();
  }

  getDirectAllDebits() {
    this.subs.add(
      this.directDebitService
        .getDirectDebits()
        .pipe(
          map((directDebits: DirectDebit[]) => {
            this.directDebits = directDebits;
            this.currentDirectDebits.set(directDebits);
          })
        )
        .subscribe()
    );
  }

  addDirectDebit(newDirectDebit: DirectDebit) {
    this.directDebitService.addDirectDebit(newDirectDebit);
  }

  async deleteDirectDebit(directDebitId: string) {
    await this.directDebitService.deleteDirectDebit(directDebitId);
  }

  editDirectDebit(directDebit: DirectDebit, directDebitId: string) {
    this.directDebitService.updateDirectDebit(directDebit, directDebitId);
  }

  openDirectDebitDialog() {
    this.addDirectDebitForm.reset();
    const dialogRef = this.dialog.open(DirectDebitsDialogComponent, {
      data: { form: this.addDirectDebitForm, add: true, edit: false },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(form => {
      if (form?.valid) {
        this.addDirectDebit(form.value);
        form.reset();
      }
    })
  }

  onEditDirectDebit(directDebit: DirectDebit, directDebitId: string) {
    this.addDirectDebitForm.patchValue(directDebit);

    const dialogRef = this.dialog.open(DirectDebitsDialogComponent, {
      data: { form: this.addDirectDebitForm, add: false, edit: true },
      width: '500px'
    })

    dialogRef.afterClosed().subscribe(form => {
      if (form?.valid) {
        this.editDirectDebit(form.value, directDebitId);
        form.reset();
      }
    })
  }

  createAddDDForm() {
    this.addDirectDebitForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      ref: ['', [Validators.required]],
      ref2: [''],
      ddAmount: ['', [Validators.required]],
      nextDue: ['', [Validators.required]],
      bankName: ['', [Validators.required]]
    })
  }

  calcTotals() {
    this.currentDirectDebits().forEach(directDebit => {
      this.allTotal += directDebit?.ddAmount
      if (directDebit.ddEnabled) {
        this.enabledTotal += directDebit.ddAmount;
      }
    })
  }

  onDirectDebitEnabled(event: any, directDebitAmount: number): void {
    if (event.checked) {
      this.enabledTotal = this.enabledTotal + directDebitAmount;
    }

    if (!event.checked) {
      this.enabledTotal = this.enabledTotal - directDebitAmount;
    }
  }

  convertTsToDate(timestamp: string | undefined): Date | string {
    if (!timestamp) return '';
    if (typeof +timestamp === 'number') {
      return new Date(+timestamp * 1000).toLocaleDateString();
    } else {
      return timestamp;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
