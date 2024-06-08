import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountCcAmexComponent } from './user-account-cc-amex.component';

describe('UserAccountCcAmexComponent', () => {
  let component: UserAccountCcAmexComponent;
  let fixture: ComponentFixture<UserAccountCcAmexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountCcAmexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountCcAmexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
