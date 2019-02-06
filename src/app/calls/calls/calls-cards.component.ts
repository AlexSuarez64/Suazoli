import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../shared/store';
import * as fromApp from '../../store';
import { Call } from '../shared/models/call';

@Component({
  selector: 'calls-cards',
  templateUrl: 'calls-cards.component.html',
  styleUrls: ['calls-cards.component.scss']
})
export class CallsCardsComponent implements OnInit {

  constructor( private store: Store<fromStore.CallsState> ) { }

  @Input() calls: Call[];
  @Input() nameFilter: string;
  @Input() descriptionFilter: string;

  ngOnInit() { }

  onEdit(id: number) {
    this.store.dispatch(new fromApp.Go({ path: ['/calls', id] }));
  }
}
