import { TestBed, inject } from '@angular/core/testing';

import { WidgetUtilService } from './widget-util.service';

describe('WidgetUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidgetUtilService]
    });
  });

  it('should be created', inject([WidgetUtilService], (service: WidgetUtilService) => {
    expect(service).toBeTruthy();
  }));
});
