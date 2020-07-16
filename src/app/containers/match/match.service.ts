import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MatchService {

  private $$matches = new BehaviorSubject<string>('');
  private baseUrl = 'https://www.cricbuzz.com/api/html/homepage-scag';
  private dataStore: { matches: string } = { matches: '' };
  public readonly matches = this.$$matches.asObservable();

  constructor(private http: HttpClient) { }

  loadAllMatches(): void {
    this.http.get<string>(this.baseUrl).subscribe(
      (data) => {
        this.dataStore.matches = data;
        this.$$matches.next(data);
      },
      (error) => console.log('Could not load matches.')
    );
  }
}
