import {Injectable, Signal, signal} from '@angular/core';
import {DirectDebit} from "../models/cards";

@Injectable({
  providedIn: 'root'
})
export class SharedSignalService {

  currentDirectDebitTotal = signal<number>(0);
  currentDirectDebitEnabledTotal = signal<number>(0);
  currentDirectDebitsEnabledForFeeCalc = signal<number>(0);

  constructor() { }

  get getDirectDebitTotal(): Signal<number> {
    return this.currentDirectDebitTotal.asReadonly();
  }

  get getDirectDebitEnabledTotal(): Signal<number> {
    return this.currentDirectDebitEnabledTotal.asReadonly();
  }

  get getDirectDebitsEnabledForFeeCalc(): Signal<number> {
    return this.currentDirectDebitsEnabledForFeeCalc.asReadonly();
  }

  updateCurrentDirectDebitTotals(currentDirectDebits: Array<DirectDebit>) {
    let total= 0;
    let totalEnabled = 0;
    let howManyDirectDebitsEnabled = 0;
    currentDirectDebits.map((directDebit: DirectDebit) => {
        total +=directDebit.ddAmount;
        if (directDebit.ddEnabled) {
          totalEnabled += directDebit.ddAmount;
          howManyDirectDebitsEnabled++;
        }
    });
    // total = +Math.round((total * 100) / 100).toFixed(2);
    this.currentDirectDebitTotal.set(total);
    this.currentDirectDebitEnabledTotal.set(totalEnabled);
    this.currentDirectDebitsEnabledForFeeCalc.set(howManyDirectDebitsEnabled);
  }
}
