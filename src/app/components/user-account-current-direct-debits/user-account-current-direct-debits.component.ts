import {Component, effect, input, OnDestroy, OnInit, signal} from '@angular/core';
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
import {DatePipe, DecimalPipe, JsonPipe, NgClass} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {CardMenuComponent} from "../card-menu/card-menu.component";
import {MatChipsModule} from "@angular/material/chips";
import {ToggleEventData} from "../../models/direct-debit.model";
import {SharedSignalService} from "../../services/shared-signal.service";

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
    DecimalPipe,
    JsonPipe,
    MatMenuModule,
    CardMenuComponent,
    NgClass,
    MatChipsModule
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
  subs = new Subscription();

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private directDebitService: DirectDebitService,
    private sharedSignalService: SharedSignalService
  ) {
    effect(() => {
      this.allTotal = this.sharedSignalService.getDirectDebitTotal();
      this.enabledTotal = this.sharedSignalService.getDirectDebitEnabledTotal();
    });
  }

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
            directDebits.map((directDebit) => {
              // Put this in serialiser in the future
              if (directDebit?.nextDue !== undefined && 'seconds' in directDebit.nextDue) {
                directDebit.nextDue = new Date(directDebit.nextDue.seconds * 1000);
              }
            })
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

  onEditDirectDebit(directDebit: DirectDebit) {
    this.addDirectDebitForm.patchValue(directDebit);

    const dialogRef = this.dialog.open(DirectDebitsDialogComponent, {
      data: { form: this.addDirectDebitForm, add: false, edit: true },
      width: '500px'
    })

    dialogRef.afterClosed().subscribe(form => {
      if (form?.valid) {
        this.directDebitService.updateDirectDebit(form.value, directDebit.id);
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
    this.sharedSignalService.updateCurrentDirectDebitTotals(
      this.currentDirectDebits()
    );
  }

  onDirectDebitEnabled(data: ToggleEventData): void {
    if (data.event.checked) {
      this.enabledTotal = this.enabledTotal + data.item.ddAmount;
    }

    if (!data.event.checked) {
      this.enabledTotal = this.enabledTotal - data.item.ddAmount;
    }
    data.item.ddEnabled = data.event.checked;
    this.directDebitService.updateDirectDebit(data.item, data.item.id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
