import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { Observable, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { MatchService } from '../../containers/match/match.service';
import { MatchModel } from '../../containers/match/match.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom // to apply CSS on injected HTML contents
})
export class MatchListComponent implements OnInit, OnDestroy {
  private alive: boolean;
  private interval: number = 60 * 2 * 1000;

  public matches: Observable<MatchModel>;
  public error: Observable<string>;
  public videoPlaylist = `https://www.youtube.com/embed/videoseries?list=${environment.playlistID}&listType=playlist`;

  constructor(
    private matchService: MatchService
  ) {}

  matchDetails(evt, url): void {
    alert(url);
  }

  ngOnInit(): void {
    this.alive = true;
    timer(0, this.interval)
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(() => {
        this.matches = this.matchService.matches;
        this.error = this.matchService.error;
        this.matchService.loadAllMatches();
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
