import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallsComponent } from './calls/calls.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '', component: CallsComponent, data: {title: 'Calls'} },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
