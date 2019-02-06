import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { CallsDashboardComponent } from './calls-dashboard.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'dashboard', component: CallsDashboardComponent, data: { title: extract('Calls Dashboard') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CallsRoutingModule { }
