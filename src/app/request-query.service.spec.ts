import { TestBed } from '@angular/core/testing';

import { RequestQueryService } from './request-query.service';

describe('RequestQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestQueryService = TestBed.get(RequestQueryService);
    expect(service).toBeTruthy();
  });
});
