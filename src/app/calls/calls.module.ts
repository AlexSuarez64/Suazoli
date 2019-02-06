import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { PrimeNGModule } from '@app/primeng.module';
import { SharedModule } from '@app/shared';
import { CallsRoutingModule } from './calls.routing';
import { components } from './';
import { providers } from './shared/providers';
import { pipes } from './shared/misc';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNGModule,
    SharedModule,
    CallsRoutingModule
  ],
  declarations: [
    ...components,
    ...pipes
  ],
  providers: [
    ...providers
  ]
})
export class CallsModule { }
