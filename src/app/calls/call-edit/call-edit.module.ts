import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '@app/primeng.module';
import { CallEditRoutingModule } from './call-edit.routing';
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
    CallEditRoutingModule
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ...providers
  ]
})
export class CallEditModule { }
