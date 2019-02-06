import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { CallEditComponent } from './call-edit.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'calls/:id', component: CallEditComponent, data: { title: extract('Call Edit') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CallEditRoutingModule { }
