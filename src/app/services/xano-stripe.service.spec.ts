import { TestBed } from '@angular/core/testing';

import { XanoStripeService } from './xano-stripe.service';

describe('XanoStripeService', () => {
  let service: XanoStripeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XanoStripeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
