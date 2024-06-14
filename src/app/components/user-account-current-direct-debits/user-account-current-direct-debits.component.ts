import {Component, input, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {map} from 'rxjs';
import {DirectDebit, MockDirectDebits} from 'src/app/models/cards';
import {GoogleUser} from 'src/app/models/users';
import {XanoUserDdService} from 'src/app/services/xano-user-dd.service';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DirectDebitsDialogComponent} from "./direct-debits-dialog/direct-debits-dialog/direct-debits-dialog.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-account-current-direct-debits',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
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
                @for (directDebit of currentDirectDebits(); track $index) {
                  <div class="my-3 p-3 shadow rounded">
                        <p><span class="tag">Company:</span> {{ directDebit.companyName }}</p>
                        <p><span class="tag">Reference:</span> {{ directDebit.ref }}</p>
                        <p><span class="tag">Personal Ref:</span> {{ directDebit.refTwo }}</p>
                        <p><span class="tag">Amount:</span> £{{ directDebit.ddAmount }}</p>
                        <p><span class="tag">Bank name:</span> {{ directDebit.bankName }}</p>
                        <p><span class="tag">Last paid:</span> {{ directDebit.lastPaid }}</p>
                        <p><span class="tag">Next payment:</span> {{ directDebit.nextDue }}</p>
                        <p><span class="tag">Enabled:</span> {{ directDebit.ddEnabled }}</p>
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

  currentUser = input<GoogleUser>();
  currentDirectDebits = signal<Array<DirectDebit>>([]);
  addDirectDebitForm: FormGroup = new FormGroup({});

  constructor(
    private xanoUserDdService: XanoUserDdService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.generateFakeDirectDebitObj(3);
    this.createAddDDForm();
    // console.log('currentUser', this.currentUser());
    // this.getDirectDebits(this.currentUser()?.id);
  }

  getDirectDebits(userId: string | undefined) {
    if (userId === undefined) {
      return;
    }

    this.xanoUserDdService.getUserDirectDebit(userId)
      .pipe(
        map((directDebits: any) => {
          this.currentDirectDebits.set(directDebits);
        })
      )
      .subscribe();
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
    this.currentDirectDebits.set(MockDirectDebits);
  }

  openDirectDebitDialog() {
    const dialogRef = this.dialog.open(DirectDebitsDialogComponent, {
      data: { form: this.addDirectDebitForm },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(form => {
      console.log("form", form.value);
      if (form.valid) {
        MockDirectDebits.push(form.value);
        form.reset();
      }
      this.currentDirectDebits.set(MockDirectDebits);
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
}
