import { TestBed } from '@angular/core/testing';

import { SharedSignalService } from './shared-signal.service';

describe('SharedSignalService', () => {
  let service: SharedSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
