import {ApiBaseFields} from "./api-base-fields.model";

export interface BankAccount extends ApiBaseFields{
  bankName: string;
  sortCode: number;
  accountNumber: number;
}
