export interface DirectDebit {
  id: string;
  userId?: string;
  bankName: string;
  ddAmount: number;
  interval: string;
  ref: string;
  refTwo: string;
  lastPaid?: string;
  nextDue?: string;
  companyName: string;
  ddEnabled: boolean;
  createdAt?: Date;
}

