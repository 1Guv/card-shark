import {Component, input, OnDestroy, OnInit, signal} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {BankAccountService} from "../../services/bank-account.service";
import {BankAccount} from "../../models/bank-accounts.model";
import {map, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DirectDebit} from "../../models/cards";
import {
  DirectDebitsDialogComponent
} from "../user-account-current-direct-debits/direct-debits-dialog/direct-debits-dialog/direct-debits-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BankAccountDialogComponent} from "./bank-account-dialog/bank-account-dialog.component";
import {DatePipe} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-user-bank-account',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    DatePipe,
    MatSlideToggle
  ],
  templateUrl: './user-bank-account.component.html',
  styleUrl: './user-bank-account.component.scss'
})
export class UserBankAccountComponent implements OnInit, OnDestroy {
  currentUser = input<any>();
  currentBankAccounts = signal<Array<BankAccount>>([]);
  bankAccountForm: FormGroup = new FormGroup({});
  subs = new Subscription();

  constructor(
    private bankAccountService: BankAccountService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.createBankAccountForm();
    this.getAllBankAccounts();
  }

  getAllBankAccounts() {
    this.subs.add(
      this.bankAccountService
        .getFSBankAccounts()
        .pipe(
          map((bankAccounts: BankAccount[]) => {
            this.currentBankAccounts.set(bankAccounts);
          })
        )
        .subscribe()
    );
  }

  openBankAccountDialog(): void {
    this.bankAccountForm.reset();
    const dialogRef = this.dialog.open(BankAccountDialogComponent, {
      data: { form: this.bankAccountForm, add: true, edit: false },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(form => {
      if (form?.valid) {
        this.bankAccountService.createFSBankAccount(form.value);
        form.reset();
      }
    })
  }

  onEditBankAccount(bankAccount: BankAccount, bankAccountId: string): void {
    this.bankAccountForm.patchValue(bankAccount);

    const dialogRef = this.dialog.open(BankAccountDialogComponent, {
      data: { form: this.bankAccountForm, add: false, edit: true },
      width: '500px'
    })

    dialogRef.afterClosed().subscribe(form => {
      if (form?.valid) {
        this.bankAccountService.updateBankAccount(bankAccount, bankAccountId);
        form.reset();
      }
    })
  }

  async onDeleteBankAccount(bankAccountId: string): Promise<void> {
    await this.bankAccountService.deleteFSBankAccount(bankAccountId);
  }

  createBankAccountForm() {
    this.bankAccountForm = this.formBuilder.group({
      bankName: ['', [Validators.required]],
      sortCode: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]]
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
