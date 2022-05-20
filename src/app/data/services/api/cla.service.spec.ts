import { TestBed } from '@angular/core/testing';

import { ClaService } from './cla.service';

describe('ClaService', () => {
  let service: ClaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
