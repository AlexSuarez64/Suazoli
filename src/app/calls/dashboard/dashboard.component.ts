import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import * as fromApp from '../../store';

const DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
  '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
  '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
  '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  highCallsStarted: number;
  highCallsCompleted: number;
  mediumCallsStarted: number;
  mediumCallsCompleted: number;
  lowCallsStarted: number;
  lowCallsCompleted: number;

  highData: any;
  mediumData: any;
  lowData: any;

  constructor(private store: Store<fromStore.CallsState>) { }

  ngOnInit() {

    this.store.select(fromStore.getCallsLoaded).subscribe(l => {
        if (!l) {
          this.store.dispatch(new fromApp.Go({ path: ['/calls'] }));
        }
    });

    this.store.select(fromStore.getHighCallsStarted).subscribe(c => { this.highCallsStarted = c; });
    this.store.select(fromStore.getHighCallsCompleted).subscribe(c => { this.highCallsCompleted = c; });
    this.store.select(fromStore.getMediumCallsStarted).subscribe(c => { this.mediumCallsStarted = c; });
    this.store.select(fromStore.getMediumCallsCompleted).subscribe(c => { this.mediumCallsCompleted = c; });
    this.store.select(fromStore.getLowCallsStarted).subscribe(c => { this.lowCallsStarted = c; });
    this.store.select(fromStore.getLowCallsCompleted).subscribe(c => { this.lowCallsCompleted = c; });

    setTimeout(() => console.log('!'), 1000);

    const highOptions = {
      title: { display: true, text: 'High Priority Calls', fontSize: 20, height: 80 },
      legend: { position: 'bottom' }
    };

    const mediumOptions = {
      title: { display: true, text: 'Medium Priority Calls', fontSize: 20, height: 80 },
      legend: { position: 'bottom' },
    };

    const lowOptions = {
      title: { display: true, text: 'Low Priority Calls', fontSize: 20, height: 80 },
      legend: { position: 'bottom' },
    };

    this.highData = {
      labels: ['Started Calls', 'Completed Calls'],
      datasets: [
        {
          data: [this.highCallsStarted, this.highCallsCompleted],
          backgroundColor: [ '#FF6384', '#FFCE56' ],
          hoverBackgroundColor: [ '#3B3EAC', '#994499' ]
        }]
    };

    this.mediumData = {
      labels: ['Started Calls', 'Completed Calls'],
      datasets: [
        {
          data: [this.mediumCallsStarted, this.mediumCallsCompleted],
          backgroundColor: [ '#FF6384', '#FFCE56' ],
          hoverBackgroundColor: [ '#3B3EAC', '#994499' ]
        }]
    };

    this.lowData = {
      labels: ['Started Calls', 'Completed Calls'],
      datasets: [
        {
          data: [this.lowCallsStarted, this.lowCallsCompleted],
          backgroundColor: [ '#FF6384', '#FFCE56' ],
          hoverBackgroundColor: [ '#3B3EAC', '#994499' ]
        }]
    };
  }
}
