import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MatchModel } from './match.model';

@Injectable()
export class MatchService {
  private $$matchOberserver = new BehaviorSubject<any>('');
  private baseUrl = '/api/matches';
  private dataStore: { matches: MatchModel[] } = { matches: [] };
  public readonly matches = this.$$matchOberserver.asObservable();

  constructor(private http: HttpClient) {}

  loadAllMatches(): void {
    this.http
      .get(this.baseUrl)
      .pipe(
        catchError((err) => {
          this.$$matchOberserver.next('<span>No matches found</span>');
          return throwError(err);
        })
      )
      .subscribe((data) => {
        this.dataStore.matches = data as MatchModel[];
        this.$$matchOberserver.next(data);
      });
  }
}
