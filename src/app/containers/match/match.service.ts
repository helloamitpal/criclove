import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Match } from './match.model';

@Injectable()
export class MatchService {

  private $$matches = new BehaviorSubject<Match[]>([]);
  private baseUrl = 'https://56e05c3213da80110013eba3.mockapi.io/api';
  private dataStore: { matches: Match[] } = { matches: [] };
  readonly matches = this.$$matches.asObservable();

  constructor(private http: HttpClient) { }

  loadAllMatches(): void {
    this.http.get<Match[]>(`${this.baseUrl}/todos`).subscribe(
      (data) => {
        this.dataStore.matches = data;
        this.$$matches.next(Object.assign({}, this.dataStore).matches);
      },
      (error) => console.log('Could not load matches.')
    );
  }
}
