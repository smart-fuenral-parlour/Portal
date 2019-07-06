import { TestBed } from '@angular/core/testing';

import { FuneralarrangementService } from './funeralarrangement.service';

describe('FuneralarrangementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuneralarrangementService = TestBed.get(FuneralarrangementService);
    expect(service).toBeTruthy();
  });
});
