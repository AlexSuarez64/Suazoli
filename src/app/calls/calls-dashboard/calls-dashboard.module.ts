import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { PrimeNGModule } from '@app/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { CallsRoutingModule } from './calls-dashboard.routing';
import { components } from './';
import { providers } from '../shared/providers';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    PrimeNGModule,
    ReactiveFormsModule,
    CallsRoutingModule,
    SharedModule
  ],
  declarations: [
    ...components
  ],
  providers: [
    ...providers
  ]
})
export class CallsDashboardModule { }
