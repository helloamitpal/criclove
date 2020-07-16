import { NgModule } from '@angular/core';

import { MatchComponent } from './match.component';
import { MatchService } from './match.service';

@NgModule({
  imports: [],
  declarations: [
    MatchComponent
  ],
  providers: [
    MatchService
  ]
})
export class MatchModule { }
