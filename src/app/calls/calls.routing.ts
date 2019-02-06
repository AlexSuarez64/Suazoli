import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { CallsComponent } from './calls.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'calls', component: CallsComponent, data: { title: extract('Calls') },
      children: [
        { path: '', component: ListComponent, data: { title: extract('Calls List') } },
        { path: 'dashboard', component: DashboardComponent, data: { title: extract('Calls Dashboard') } },
        { path: ':id', component: EditComponent, data: { title: extract('Call Edit') } },
        { path: 'list', component: ListComponent, data: { title: extract('Calls List') } },
        { path: '**', redirectTo: 'list', pathMatch: 'full' }
      ]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CallsRoutingModule { }
