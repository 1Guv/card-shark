export interface DirectDebit {
  id: string;
  bankName: string;
  ddAmount: number;
  interval: string;
  ref: string;
  refTwo: string;
  lastPaid?: string;
  nextDue?: string;
  companyName: string;
  ddEnabled: boolean;
  userId: string;
  createdAt: Date;
}
