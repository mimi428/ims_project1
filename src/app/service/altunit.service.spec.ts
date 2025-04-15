import { TestBed } from '@angular/core/testing';

import { AltunitService } from './altunit.service';

describe('AltunitService', () => {
  let service: AltunitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltunitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
