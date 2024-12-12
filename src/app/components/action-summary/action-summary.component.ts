import {Component, effect, OnDestroy, OnInit} from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {SharedSignalService} from "../../services/shared-signal.service";
import {BankAccountService} from "../../services/bank-account.service";
import {BankAccount} from "../../models/bank-accounts.model";
import {map, Subscription} from "rxjs";
import {ukBanks} from "../../models/banks.model";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-action-summary',
  standalone: true,
  imports: [
    DecimalPipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    NgOptimizedImage,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './action-summary.component.html',
  styleUrl: './action-summary.component.scss'
})
export class ActionSummaryComponent implements OnInit, OnDestroy {

  allTotal = 0;
  enabledTotal = 0;
  currentFeePercentage: number = 0.01; // 0.1% Card Shark percentage fee
  currentFeeFixed: number = 12.00; // Card Shark fixed fee
  transactionFee: number = 0.25; // 25p
  amexFee: number = 0.02; // 2.0%
  bankAccounts: Array<BankAccount> = [];
  selectedBankAccount: BankAccount = {
    id: 'x',
    bankName: '',
    sortCode: 0,
    accountNumber: 0
  };
  subs: Subscription = new Subscription();

  constructor(
    private sharedSignalService: SharedSignalService,
    private bankAccountService: BankAccountService
  ) {
    effect(() => {
      this.allTotal = this.sharedSignalService.getDirectDebitTotal();
      this.enabledTotal = this.sharedSignalService.getDirectDebitEnabledTotal();
    })
  }

  ngOnInit() {
    this.subs.add(
      this.bankAccountService
        .getFSBankAccounts()
        .pipe(
          map((accounts: Array<BankAccount>) => {
            this.bankAccounts = accounts;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
