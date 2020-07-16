import { Component, OnInit } from '@angular/core';

import { PlayerService } from './player.service';
import { Player } from './player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  players: Player[];

  constructor(private playerService: PlayerService) {
    this.players = [];
  }

  ngOnInit(): void {
    this.playerService.list().subscribe((players: Player[]) => {
      this.players = players;
    });
  }

}
