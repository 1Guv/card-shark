import {Component, input, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {map, tap} from 'rxjs';
import {DirectDebit} from 'src/app/models/cards';
import {AWSUser, GoogleUser} from 'src/app/models/users';
import {XanoUserDdService} from 'src/app/services/xano-user-dd.service';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DirectDebitsDialogComponent} from "./direct-debits-dialog/direct-debits-dialog/direct-debits-dialog.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {DirectDebitService} from "../../services/direct-debit.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-account-current-direct-debits',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  template: `
    <mat-card class="my-3">
          <div class="mx-2 my-2 card-one">
              <mat-card-header>
                  <mat-card-title>Direct Debits</mat-card-title>
                  <mat-card-subtitle>
                      You have {{ currentDirectDebits().length }} direct debits / subscriptions
                  </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>

                <div class="my-3 p-3 shadow rounded bg-warning">
                  <h2>Summary:</h2>

                  <p><span class="summary-tag">All Total:</span> {{ allTotal }}</p>
                  <p><span class="summary-tag">Total Enabled:</span> {{ enabledTotal }}</p>
                  <p><span class="summary-tag">Total Disabled:</span> {{ allTotal - enabledTotal }}</p>
                </div>

                @for (directDebit of currentDirectDebits(); track $index) {
                  <div class="my-3 p-3 shadow rounded">
                        <p><mat-slide-toggle (change)="onDirectDebitEnabled($event, directDebit.ddAmount)" labelPosition="before" [(ngModel)]="directDebit.ddEnabled"></mat-slide-toggle></p>
                        <p><span class="tag">Company:</span> {{ directDebit.companyName }}</p>
                        <p><span class="tag">Reference:</span> {{ directDebit.ref }}</p>
                        <p><span class="tag">Personal Ref:</span> {{ directDebit.refTwo }}</p>
                        <p><span class="tag">Amount:</span> £{{ directDebit.ddAmount }}</p>
                        <p><span class="tag">Bank name:</span> {{ directDebit.bankName }}</p>
                        <p><span class="tag">Last paid:</span> {{ directDebit.lastPaid }}</p>
                        <p><span class="tag">Next payment:</span> {{ directDebit.nextDue }}</p>
                        <button (click)="deleteDirectDebit(directDebit.id)" class="delete-btn"></button>
                    </div>
                }
              </mat-card-content>
              <mat-card-actions>
                  <button mat-raised-button color="primary" (click)="openDirectDebitDialog()">ADD DIRECT DEBIT</button>
              </mat-card-actions>
          </div>
      </mat-card>
  `,
  styleUrl: './user-account-current-direct-debits.component.scss'
})

export class UserAccountCurrentDirectDebitsComponent implements OnInit{

  // client = generateClient<Schema>();

  // currentUser = input<GoogleUser | AWSUser>();
  currentUser = input<any>();
  currentDirectDebits = signal<Array<DirectDebit>>([]);
  addDirectDebitForm: FormGroup = new FormGroup({});
  allTotal: number = 0;
  enabledTotal: number = 0;

  directDebits: Array<DirectDebit> = [];

  constructor(
    private xanoUserDdService: XanoUserDdService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private directDebitService: DirectDebitService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.createAddDDForm();
    this.getDirectAllDebits();
  }

  getDirectAllDebits() {
    this.directDebitService
      .getDirectDebits()
      .pipe(tap((directDebits: any) => console.log('dd >', directDebits)))
      .subscribe((directDebits) => {
        this.directDebits = directDebits;
        this.currentDirectDebits.set(directDebits);
      });
  }

  async addDirectDebit(newDirectDebit: DirectDebit) {
    this.directDebitService.addDirectDebit(newDirectDebit);
  }

  async deleteDirectDebit(directDebitId: string) {
    await this.directDebitService.deleteDirectDebit(directDebitId);
  }

  getDirectDebits(userId: string | undefined) {
    if (userId === undefined) {
      return;
    }

    // this.xanoUserDdService.getUserDirectDebit(userId)
    //   .pipe(
    //     map((directDebits: any) => {
    //       this.currentDirectDebits.set(directDebits);
    //     })
    //   )
    //   .subscribe();
  }

  generateFakeDirectDebitObj(iteration: number) {
    // const directDebits: Array<DirectDebit> = [];
    // for(let i=0; i<iteration; i++) {
    //  let ddObj: DirectDebit = {
    //   bankName: 'Halifax',
    //   ddAmount: 26,
    //   interval: 'monthly',
    //   ref: '7075406878-1002',
    //   refTwo: 'Voda bill',
    //   lastPaid: '',
    //   nextDue: '',
    //   companyName: 'Vodafone Ltd',
    //   ddEnabled: true
    //  };
    //  directDebits.push(ddObj);
    // }
    // this.currentDirectDebits.set(MockDirectDebits);
  }

  openDirectDebitDialog() {
    const dialogRef = this.dialog.open(DirectDebitsDialogComponent, {
      data: { form: this.addDirectDebitForm },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(form => {
      console.log("form", form.value);
      if (form.valid) {
        // MockDirectDebits.push(form.value);
        // this.createDirectDebits(form.value);
        this.addDirectDebit(form.value);
        form.reset();
      }
      // this.currentDirectDebits.set(MockDirectDebits);
    })
  }

  createAddDDForm() {
    this.addDirectDebitForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      ref: ['', [Validators.required]],
      ref2: [''],
      ddAmount: ['', [Validators.required]],
      nextDue: ['', [Validators.required]],
      bankName: ['', [Validators.required]]
    })
  }

  calcTotals() {
    // MockDirectDebits.forEach(directDebit => {
    //   this.allTotal += directDebit?.ddAmount
    //   if (directDebit.ddEnabled) {
    //     this.enabledTotal += directDebit.ddAmount;
    //   }
    // })
  }

  onDirectDebitEnabled(event: any, directDebitAmount: number): void {
    if (event.checked) {
      this.enabledTotal = this.enabledTotal + directDebitAmount;
    }

    if (!event.checked) {
      this.enabledTotal = this.enabledTotal - directDebitAmount;
    }
  }

  // async listDirectDebits() {
  //
  //   // try {
  //   //   this.client.models.DirectDebit.observeQuery().subscribe({
  //   //     next: ({ items, isSynced }) => {
  //   //       console.log('items', items);
  //   //       // this.directDebits = items;
  //   //       // this.currentDirectDebits.set(items);
  //   //     },
  //   //   });
  //   // } catch (error) {
  //   //   console.error('error fetching direct debits', error);
  //   // }
  // }

  // createDirectDebits(newDirectDebit: DirectDebit): void {
  //   console.log('newDirectDebit', newDirectDebit);
  // }
}
