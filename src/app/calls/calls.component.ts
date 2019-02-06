import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../shared/calls-store';

@Component({
  selector: 'calls',
  templateUrl: '<router-outlet></router-outlet>'
})
export class CallsComponent implements OnInit {

  constructor( private store: Store<fromStore.CallsState> ) { }

  ngOnInit() { }

}
