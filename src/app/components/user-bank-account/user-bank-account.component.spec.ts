import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBankAccountComponent } from './user-bank-account.component';

describe('UserBankAccountComponent', () => {
  let component: UserBankAccountComponent;
  let fixture: ComponentFixture<UserBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBankAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
