import { TestBed } from '@angular/core/testing';

import { PolicytypeService } from './policytype.service';

describe('PolicytypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolicytypeService = TestBed.get(PolicytypeService);
    expect(service).toBeTruthy();
  });
});
