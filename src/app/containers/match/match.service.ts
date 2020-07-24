import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as $ from 'jquery';

@Injectable()
export class MatchService {
  private $$matchOberserver = new BehaviorSubject<any>('');
  private baseUrl = '/api/matches';
  private dataStore: { matches: string } = { matches: '' };
  public readonly matches = this.$$matchOberserver.asObservable();

  constructor(private http: HttpClient) {}

  loadAllMatches(): void {
    this.http
      .get(this.baseUrl, { responseType: 'text' })
      .pipe(
        catchError((err) => {
          this.$$matchOberserver.next('<span>No matches found</span>');
          return throwError(err);
        })
      )
      .subscribe((data) => {
        $(data).append('<p>amit</p>');
        this.dataStore.matches = data;
        this.$$matchOberserver.next(data);
      });
  }
}
