import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { MatchService } from '../../containers/match/match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom // to apply CSS on injected HTML contents
})
export class MatchListComponent implements OnInit, OnDestroy {

  public matches: Observable<string>;
  private alive: boolean;
  private interval: number = 60 * 2 * 1000;

  constructor(private matchService: MatchService) {
  }

  ngOnInit(): void {
    this.alive = true;
    timer(0, this.interval)
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(() => {
        this.matches = this.matchService.matches;
        this.matchService.loadAllMatches();
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
