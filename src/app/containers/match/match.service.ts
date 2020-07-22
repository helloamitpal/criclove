import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MatchService {
  private $$matches = new BehaviorSubject<any>('');
  private baseUrl = '/api/matches';
  private dataStore: { matches: string } = { matches: '' };
  public readonly matches = this.$$matches.asObservable();

  constructor(private http: HttpClient) {}

  loadAllMatches(): void {
    this.http
      .get(this.baseUrl, { responseType: 'text' })
      .pipe(
        catchError((err) => {
          this.$$matches.next('<span>No matches found</span>');
          return throwError(err);
        })
      )
      .subscribe((data) => {
        this.dataStore.matches = data;
        this.$$matches.next(data);
      });
  }
}
