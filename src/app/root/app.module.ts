import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '../router/app-routing.module';
import { AppComponent } from '../root/app.component';
import { MaterialModule } from './material.module';
import { MatchModule } from '../containers/match/match.module';
import { MatchListComponent } from '../components/match-list/match-list.component';
import { HttpErrorInterceptor } from './global-http-Interceptor.service';
import { rollbarFactory, RollbarService } from './error-reporter';

@NgModule({
  declarations: [
    AppComponent,
    MatchListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatchModule
  ],
  providers: [
    {
      provide: RollbarService,
      useFactory: rollbarFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
