export interface DirectDebit {
    bankName: string;
    ddAmount: number;
    interval: string;
    ref: string;
    refTwo: string;
    lastPaid?: string;
    nextDue?: string;
    companyName: string;
    ddEnabled: boolean;
}
