import { TestBed, inject } from '@angular/core/testing';

import { TudipApiService } from './tudip-api.service';

describe('TudipApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TudipApiService]
    });
  });

  it('should be created', inject([TudipApiService], (service: TudipApiService) => {
    expect(service).toBeTruthy();
  }));
});
