import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountCurrentDirectDebitsComponent } from './user-account-current-direct-debits.component';

describe('UserAccountCurrentDirectDebitsComponent', () => {
  let component: UserAccountCurrentDirectDebitsComponent;
  let fixture: ComponentFixture<UserAccountCurrentDirectDebitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountCurrentDirectDebitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountCurrentDirectDebitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
