import { TestBed } from '@angular/core/testing';

import { PayouttypeService } from './payouttype.service';

describe('PayouttypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayouttypeService = TestBed.get(PayouttypeService);
    expect(service).toBeTruthy();
  });
});
