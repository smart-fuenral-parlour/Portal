import { TestBed } from '@angular/core/testing';

import { ExtratypeService } from './extratype.service';

describe('ExtratypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtratypeService = TestBed.get(ExtratypeService);
    expect(service).toBeTruthy();
  });
});
