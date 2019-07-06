import { TestBed } from '@angular/core/testing';

import { LifestatusService } from './lifestatus.service';

describe('LifestatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LifestatusService = TestBed.get(LifestatusService);
    expect(service).toBeTruthy();
  });
});
