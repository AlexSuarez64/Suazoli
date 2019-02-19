import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../shared/calls-store';
import * as fromApp from '../store';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'calls',
  templateUrl: './calls.component.html'
})
export class CallsComponent implements OnInit {

  constructor( private store: Store<fromStore.CallsState> ) { }
  items: MenuItem[];
  ngOnInit() { }

  onAddCall() {
    this.store.dispatch(new fromApp.Go({ path: ['/calls', 0] }));
  }

  onCalls() {
    this.store.dispatch(new fromApp.Go({ path: ['/calls'] }));
  }

  onDashboard() {
    this.store.dispatch(new fromApp.Go({ path: ['/calls/dashboard'] }));
  }
}
