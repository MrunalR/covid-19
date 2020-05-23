import { TestBed } from '@angular/core/testing';

import { DataServieService } from './data-servie.service';

describe('DataServieService', () => {
  let service: DataServieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataServieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
