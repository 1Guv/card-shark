export interface DirectDebit {
  id: string;
  userId: string;
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

// export const MockDirectDebits: Array<DirectDebit> = [
//   {
//     bankName: 'Halifax',
//     ddAmount: 18,
//     interval: 'monthly',
//     ref: 'Netflix Subscription',
//     refTwo: '',
//     lastPaid: '10/05/2024',
//     nextDue: '10/06/2024',
//     companyName: 'Netflix',
//     ddEnabled: true,
//   },
//   {
//     bankName: 'Halifax',
//     ddAmount: 22,
//     interval: 'monthly',
//     ref: 'Disney Plus Subscription',
//     refTwo: '',
//     lastPaid: '03/05/2024',
//     nextDue: '03/06/2024',
//     companyName: 'Disney',
//     ddEnabled: true,
//   },
//   {
//     bankName: 'Halifax',
//     ddAmount: 18,
//     interval: 'monthly',
//     ref: 'Spotify Subscription',
//     refTwo: '',
//     lastPaid: '01/05/2024',
//     nextDue: '01/06/2024',
//     companyName: 'Spotify',
//     ddEnabled: true,
//   },
// ];
