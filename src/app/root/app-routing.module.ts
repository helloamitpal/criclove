import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { MatchModule } from '../containers/match/match.module';

const routes: Routes = [
  { path: 'home', loadChildren: () => MatchModule },
  {
    redirectTo: '/home',
    path: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
