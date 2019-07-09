import { TestBed } from '@angular/core/testing';

import { ClaimauditService } from './claimaudit.service';

describe('ClaimauditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimauditService = TestBed.get(ClaimauditService);
    expect(service).toBeTruthy();
  });
});
