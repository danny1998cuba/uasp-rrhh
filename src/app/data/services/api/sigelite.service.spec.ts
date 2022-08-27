import { TestBed } from '@angular/core/testing';

import { SigeliteService } from './sigelite.service';

describe('SigeliteService', () => {
  let service: SigeliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigeliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
