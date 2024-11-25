import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  collectionData,
  query,
  where,
  orderBy,
} from "@angular/fire/firestore";
import {BankAccount} from "../models/bank-accounts.model";
import {Observable, of, switchMap} from "rxjs";
import {DirectDebit} from "../models/cards";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  fireBaseBankAccountUrl = 'bank-accounts';

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
  ) { }

  getFSBankAccounts(): Observable<BankAccount[]> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        const bankAccountsRef = collection(this.firestore, this.fireBaseBankAccountUrl);
        const q = query(
          bankAccountsRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'asc')
        );
        return collectionData(q, { idField: 'id' }) as Observable<BankAccount[]>;
      })
    );
  }

  createFSBankAccount(bankAccount: BankAccount) {
    return this.authService.currentUser$
      .pipe(
        switchMap((user) => {
          if (!user) return Promise.reject('No user logged in');
          const bankAccountsRef = collection(this.firestore, this.fireBaseBankAccountUrl);
          bankAccount.userId = user.uid;
          bankAccount.createdAt = new Date();
          return addDoc(bankAccountsRef, bankAccount);
        })
      )
      .subscribe();
  }

  deleteFSBankAccount(bankAccountId: string) {
    const bankAccountRef = doc(this.firestore, `${this.fireBaseBankAccountUrl}/${bankAccountId}`);
    return deleteDoc(bankAccountRef);
  }

  updateFSBankAccount(updatedBankAccount: Partial<BankAccount>, bankAccountId: string) {
    return this.authService.currentUser$
      .pipe(
        switchMap((user) => {
          if (!user) return Promise.reject('No user logged in');
          const bankAccountRef = doc(this.firestore, `bank-accounts/${bankAccountId}`);
          updatedBankAccount.userId = user.uid;
          updatedBankAccount.updatedAt = new Date();
          return updateDoc(bankAccountRef, updatedBankAccount);
        })
      )
      .subscribe();
  }
}
