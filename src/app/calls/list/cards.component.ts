import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import * as fromApp from '../../store';
import { Call } from '../shared/models/call';

@Component({
  selector: 'cards',
  templateUrl: 'cards.component.html',
  styleUrls: ['cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() calls: Call[];
  @Input() nameFilter: string;
  @Input() descriptionFilter: string;

  constructor( private store: Store<fromStore.CallsState> ) { }

  ngOnInit() { }

  onEdit(id: number) {
    this.store.dispatch(new fromApp.Go({ path: ['/calls', id] }));
  }
}
