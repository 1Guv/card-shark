import {Component, input, OnDestroy, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {map, Subscription} from 'rxjs';
import {DirectDebit} from 'src/app/models/cards';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DirectDebitsDialogComponent} from "./direct-debits-dialog/direct-debits-dialog/direct-debits-dialog.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {DirectDebitService} from "../../services/direct-debit.service";
import {AuthService} from "../../services/auth.service";
import {DatePipe, DecimalPipe} from "@angular/common";

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
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './user-account-current-direct-debits.component.html',
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
  }

  getDirectAllDebits() {
    this.subs.add(
      this.directDebitService
        .getDirectDebits()
        .pipe(
          map((directDebits: DirectDebit[]) => {
            this.directDebits = directDebits;
            this.currentDirectDebits.set(directDebits);
            this.calcTotals();
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
    this.allTotal = 0;
    this.enabledTotal = 0;

    this.currentDirectDebits().forEach(directDebit => {
      this.allTotal += Number(directDebit?.ddAmount);
      if (directDebit.ddEnabled) {
        this.enabledTotal += Number(directDebit.ddAmount);
      }
    })
  }

  onDirectDebitEnabled(event: any, directDebitAmount: number, directDebit: DirectDebit): void {
    if (event.checked) {
      this.enabledTotal = this.enabledTotal + directDebitAmount;
    }

    if (!event.checked) {
      this.enabledTotal = this.enabledTotal - directDebitAmount;
    }
    directDebit.ddEnabled = event.checked;
    this.editDirectDebit(directDebit, directDebit.id);
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
