import { TestBed } from '@angular/core/testing';

import { DirectDebitService } from './direct-debit.service';

describe('DirectDebitService', () => {
  let service: DirectDebitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectDebitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
