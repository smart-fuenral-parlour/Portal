import { TestBed } from '@angular/core/testing';

import { BankingdetailsService } from './bankingdetails.service';

describe('BankingdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankingdetailsService = TestBed.get(BankingdetailsService);
    expect(service).toBeTruthy();
  });
});
