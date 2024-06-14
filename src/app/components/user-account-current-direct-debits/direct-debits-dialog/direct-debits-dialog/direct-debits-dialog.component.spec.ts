import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDebitsDialogComponent } from './direct-debits-dialog.component';

describe('DirectDebitsDialogComponent', () => {
  let component: DirectDebitsDialogComponent;
  let fixture: ComponentFixture<DirectDebitsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectDebitsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectDebitsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
