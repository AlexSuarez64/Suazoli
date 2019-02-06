import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { reducers, effects, CustomSerializer } from './store';

import { MaterialModule } from './material.module';
import { PrimeNGModule } from './primeng.module';
import { InMemoryWebApiModule   } from 'angular-in-memory-web-api';
import { CallData } from './calls/shared/misc/call-data';
import { callsReducer } from './shared/store/reducers/calls.reducer';
import { CallsEffects } from './shared/store/effects/calls.effects';

import { environment } from '../environments/environment';
export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

import { AboutModule } from './about/about.module';
import { CallEditModule } from './calls/call-edit/call-edit.module';
import { CallsModule } from './calls/calls/calls.module';
import { CallsDashboardModule } from './calls/calls-dashboard/calls-dashboard.module';
import { CoreModule } from '@app/core';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from '@app/shared';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    PrimeNGModule,
    FontAwesomeModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    CallEditModule,
    CallsModule,
    CallsDashboardModule,
    LoginModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    InMemoryWebApiModule.forFeature(CallData),
    StoreModule.forFeature('calls', callsReducer),
    EffectsModule.forFeature([CallsEffects]),

    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
