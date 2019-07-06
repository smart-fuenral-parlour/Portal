import { TestBed } from '@angular/core/testing';

import { PolicystatusService } from './policystatus.service';

describe('PolicystatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolicystatusService = TestBed.get(PolicystatusService);
    expect(service).toBeTruthy();
  });
});
