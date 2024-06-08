import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XanoUserDdService {

  xanoUserDirectDebitApi = '';

  constructor(
    private http: HttpClient
  ) { }

  getUserDirectDebit(userId: string) {
    return this.http.get(this.xanoUserDirectDebitApi + userId);
  }

  removeUserDirectDebit(userId: string) {

  }
}
