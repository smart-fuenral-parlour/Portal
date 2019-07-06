import { TestBed } from '@angular/core/testing';

import { InformantService } from './informant.service';

describe('InformantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformantService = TestBed.get(InformantService);
    expect(service).toBeTruthy();
  });
});
