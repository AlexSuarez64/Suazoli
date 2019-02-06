import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../shared/calls-store';
import * as fromApp from '../../store';
import { Call } from '../shared/models/call';

@Component({
  selector: 'cards',
  templateUrl: 'cards.component.html',
  styleUrls: ['cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor( private store: Store<fromStore.CallsState> ) { }

  @Input() calls: Call[];
  @Input() nameFilter: string;
  @Input() descriptionFilter: string;

  ngOnInit() { }

  onEdit(id: number) {
    this.store.dispatch(new fromApp.Go({ path: ['/calls', id] }));
  }
}
