import { TestBed } from '@angular/core/testing';

import { PolicydetailsService } from './policydetails.service';

describe('PolicydetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolicydetailsService = TestBed.get(PolicydetailsService);
    expect(service).toBeTruthy();
  });
});
