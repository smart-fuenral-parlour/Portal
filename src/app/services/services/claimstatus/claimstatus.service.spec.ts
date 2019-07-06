import { TestBed } from '@angular/core/testing';

import { ClaimstatusService } from './claimstatus.service';

describe('ClaimstatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimstatusService = TestBed.get(ClaimstatusService);
    expect(service).toBeTruthy();
  });
});
