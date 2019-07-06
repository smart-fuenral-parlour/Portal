import { TestBed } from '@angular/core/testing';

import { ClaimtypeService } from './claimtype.service';

describe('ClaimtypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimtypeService = TestBed.get(ClaimtypeService);
    expect(service).toBeTruthy();
  });
});
