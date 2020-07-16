import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerComponent } from '../containers/player/player.component';
import { MatchComponent } from '../containers/match/match.component';

const routes: Routes = [
  { path: 'player', component: PlayerComponent },
  { path: 'match', component: MatchComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
