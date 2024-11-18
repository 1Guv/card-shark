import { Injectable } from '@angular/core';
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
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, switchMap, of } from 'rxjs';
import {DirectDebit} from "../models/cards";

@Injectable({
  providedIn: 'root',
})
export class DirectDebitService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  getDirectDebits(): Observable<DirectDebit[]> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user) return of([]);
        const directDebitsRef = collection(this.firestore, 'direct-debits');
        const q = query(
          directDebitsRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'asc')
        );
        return collectionData(q, { idField: 'id' }) as Observable<DirectDebit[]>;
      })
    );
  }

  addDirectDebit(directDebit: DirectDebit) {
    return this.authService.currentUser$
      .pipe(
        switchMap((user) => {
          if (!user) return Promise.reject('No user logged in');
          const directDebitsRef = collection(this.firestore, 'direct-debits');
          directDebit.userId = user.uid;
          directDebit.createdAt = new Date();
          console.log('dd add>', directDebit);
          return addDoc(directDebitsRef, directDebit);
        })
      )
      .subscribe();
  }

  deleteDirectDebit(directDebitId: string) {
    const directDebitRef = doc(
      this.firestore,
      `direct-debits/${directDebitId}`
    );
    return deleteDoc(directDebitRef);
  }
}
