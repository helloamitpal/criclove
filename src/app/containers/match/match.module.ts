import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchDetailsComponent } from '../../components/match-details/match-details.component';
import { MatchListComponent } from '../../components/match-list/match-list.component';
import { MatchService } from './match.service';
import { MatchRoutingModule } from './match-routing.module';
import { SafePipe } from '../../filters/safe.pipe';

@NgModule({
  imports: [
    MatchRoutingModule,
    CommonModule
  ],
  declarations: [
    MatchDetailsComponent,
    MatchListComponent,
    SafePipe
  ],
  providers: [
    MatchService
  ]
})
export class MatchModule { }
