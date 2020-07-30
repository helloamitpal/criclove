import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MatchModel } from './match.model';

@Injectable()
export class MatchService {
  private $$matchOberserver = new BehaviorSubject<any>(null);
  private $$ErrorObserver = new BehaviorSubject<string>(null);
  private baseUrl = '/api/matches';
  // datastore property can be used internally in this service if multiple functions
  // try to manipulate the same dataset
  private dataStore: { matches: MatchModel[] } = { matches: [] };

  public readonly matches = this.$$matchOberserver.asObservable();
  public readonly error = this.$$ErrorObserver.asObservable();

  constructor(private http: HttpClient) {}

  loadAllMatches(): void {
    this.http
      .get(this.baseUrl)
      .pipe(
        catchError((err) => {
          this.$$ErrorObserver.next('Something went wrong. Please wait for sometime.');
          return throwError(err);
        })
      )
      .subscribe((data) => {
        const dataset = data as MatchModel[];

        if (dataset.length === 0) {
          this.dataStore.matches = [];
          this.$$ErrorObserver.next('No matches found');
        } else {
          this.dataStore.matches = dataset;
          this.$$matchOberserver.next(dataset);
        }
      });
  }
}
