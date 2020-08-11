import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchDetailsComponent } from '../../components/match-details/match-details.component';
import { MatchListComponent } from '../../components/match-list/match-list.component';
import { MatchService } from './match.service';
import { MatchRoutingModule } from './match-routing.module';
import { SafePipe } from '../../filters/safe.pipe';
import { MaterialModule } from '../../root/material.module';

@NgModule({
  imports: [
    MatchRoutingModule,
    CommonModule,
    MaterialModule
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
