import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaContentCardsComponent } from './cta-content-cards.component';

describe('CtaContentCardsComponent', () => {
  let component: CtaContentCardsComponent;
  let fixture: ComponentFixture<CtaContentCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaContentCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtaContentCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
