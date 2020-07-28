import { NgModule } from '@angular/core';

import { MatchComponent } from './match.component';
import { MatchListComponent } from '../../components/match-list/match-list.component';
import { MatchService } from './match.service';
import { MatchRoutingModule } from './match-routing.module';

@NgModule({
  imports: [
    MatchRoutingModule
  ],
  declarations: [
    MatchComponent,
    MatchListComponent
  ],
  providers: [
    MatchService
  ]
})
export class MatchModule { }
