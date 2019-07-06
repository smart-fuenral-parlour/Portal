import { TestBed } from '@angular/core/testing';

import { AudittableService } from './audittable.service';

describe('AudittableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudittableService = TestBed.get(AudittableService);
    expect(service).toBeTruthy();
  });
});
