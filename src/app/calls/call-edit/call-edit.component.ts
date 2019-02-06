import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Call } from '../shared/models/call';
import * as fromStore from '../../shared/store';

@Component({
  templateUrl: './call-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallEditComponent implements OnInit {

  call$: Observable<Call>;

  constructor(private store: Store<fromStore.CallsState>) {}

  ngOnInit() {
    this.call$ = this.store.select(fromStore.getCall) as Observable<Call>;
  }

  onCreate(call: Call) {
    this.store.dispatch(new fromStore.CreateCall(call));
  }

  onUpdate(call: Call) {
    this.store.dispatch(new fromStore.UpdateCall(call));
  }

  onRemove(call: Call) {
    this.store.dispatch(new fromStore.DeleteCall(call));
  }
}

