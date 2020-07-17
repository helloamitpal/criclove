import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MatchService {

  private $$matches = new BehaviorSubject<string>('');
  private baseUrl = 'https://www.cricbuzz.com/api/html/homepage-scag';
  private dataStore: { matches: string } = { matches: '' };
  public readonly matches = this.$$matches.asObservable();

  constructor(private http: HttpClient) { }

  loadAllMatches(): void {
    this.http.get<string>(this.baseUrl)
    .pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error(err);
        return throwError(err);
      })
    )
    .subscribe(
      (data) => {
        this.dataStore.matches = data;
        this.$$matches.next(data);
      }
    );
  }
}
