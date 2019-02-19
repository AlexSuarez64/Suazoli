import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Call } from '../shared/models/call';
import * as fromStore from '../../shared/calls-store';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  highCalls$: Observable<Call[]>;
  mediumCalls$: Observable<Call[]>;
  lowCalls$: Observable<Call[]>;

  loaded$: Observable<boolean>;
  errorMessage$: Observable<string>;
  descriptionFilter: string;
  nameFilter: string;

  constructor( private store: Store<fromStore.CallsState> ) {}

  ngOnInit() {
    this.loaded$ = this.store.select(fromStore.getCallsLoaded);
    this.loaded$.subscribe(l => {
      if (l == false) {
        this.store.dispatch(new fromStore.LoadCalls());
      }
    });

    this.highCalls$ = this.store.select(fromStore.getHighCalls);
    this.mediumCalls$ = this.store.select(fromStore.getMediumCalls);
    this.lowCalls$ = this.store.select(fromStore.getLowCalls);
    this.errorMessage$ = this.store.select(fromStore.getError);
  }
}
