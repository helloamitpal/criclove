/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatchListService } from './match.service';

describe('Service: MatchList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchListService]
    });
  });

  it('should ...', inject([MatchListService], (service: MatchListService) => {
    expect(service).toBeTruthy();
  }));
});
