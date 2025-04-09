import { TestBed } from '@angular/core/testing';

import { BillingStateService } from './billing-state.service';

describe('BillingStateService', () => {
  let service: BillingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
