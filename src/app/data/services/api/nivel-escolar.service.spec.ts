import { TestBed } from '@angular/core/testing';

import { NivelEscolarService } from './nivel-escolar.service';

describe('NivelEscolarService', () => {
  let service: NivelEscolarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NivelEscolarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
