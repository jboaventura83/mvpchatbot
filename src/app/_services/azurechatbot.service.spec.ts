/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AzurechatbotService } from './azurechatbot.service';

describe('Service: Azurechatbot', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AzurechatbotService]
    });
  });

  it('should ...', inject([AzurechatbotService], (service: AzurechatbotService) => {
    expect(service).toBeTruthy();
  }));
});
