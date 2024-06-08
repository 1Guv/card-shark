import { TestBed } from '@angular/core/testing';

import { XanoUserDdService } from './xano-user-dd.service';

describe('XanoUserDdService', () => {
  let service: XanoUserDdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XanoUserDdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
