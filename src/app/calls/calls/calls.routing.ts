import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { CallsComponent } from './calls.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'calls', component: CallsComponent, data: { title: extract('Calls') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CallsRoutingModule { }
