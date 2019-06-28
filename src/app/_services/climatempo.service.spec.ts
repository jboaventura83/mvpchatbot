/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClimatempoService } from './climatempo.service';

describe('Service: Climatempo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClimatempoService]
    });
  });

  it('should ...', inject([ClimatempoService], (service: ClimatempoService) => {
    expect(service).toBeTruthy();
  }));
});
