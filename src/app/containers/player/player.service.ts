import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Player, PlayerAdapter } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = 'http://localhost:8000/courses';

  constructor(private http: HttpClient, private adapter: PlayerAdapter) {}

  list(): Observable<Player[]> {
    const url = this.baseUrl;
    return this.http
      .get(url)
      .pipe(map((data: any[]) => data.map(item => this.adapter.adapt(item))));
  }
}
