import {ApiBaseFields} from "./api-base-fields.model";

export interface DirectDebit extends ApiBaseFields{
  bankName: string;
  ddAmount: number;
  interval: string;
  ref: string;
  refTwo: string;
  lastPaid?: string;
  nextDue?: any;
  companyName: string;
  ddEnabled: boolean;
}
