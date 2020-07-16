import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MatchService } from '../../containers/match/match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  matches: Observable<string>;

  constructor(private matchService: MatchService) {
  }

  ngOnInit(): void {
    this.matches = this.matchService.matches;
    this.matchService.loadAllMatches();
  }

}
