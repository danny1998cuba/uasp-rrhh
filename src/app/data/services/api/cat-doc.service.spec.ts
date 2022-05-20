import { TestBed } from '@angular/core/testing';

import { CatDocService } from './cat-doc.service';

describe('CatDocService', () => {
  let service: CatDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
