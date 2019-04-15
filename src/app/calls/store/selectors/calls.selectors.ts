import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../../app/store';
import * as fromR from '../reducers/calls.reducer';
import { Call } from '../../../calls/shared/models/call';

export const selectCallsState = createFeatureSelector<fromR.CallsState>('calls');

export const getAllCalls = createSelector(
  selectCallsState,
  callsState => {
    return  Object.keys(callsState.entities).map(id => callsState.entities[parseInt(id, 10)]);
  }
);

export const getCall = createSelector(
  selectCallsState,
  fromRoot.getRouterState,
  (callsState, router): Call  => {
    if (parseInt(router.state.params.id, 10) === 0) {
      return {
        _id: '',
        name: '',
        description: '',
        priority: 'High',
        startDate: '',
        completionDate: '',
        createdOn: '',
        updatedOn: ''
      };
    } else {
      return router.state && callsState.entities[parseInt(router.state.params.id, 10)];
    }
  }
);

export const getCalls = createSelector(
  selectCallsState,
  callsState => Object.keys(callsState.entities).map(id => callsState.entities[parseInt(id, 10)])
);

export const getError = createSelector(
  selectCallsState,
  state => state.error
);

export const getCallsLoaded = createSelector(
  selectCallsState,
  state => state.loaded
);

export const getHighCalls = createSelector(
  getCalls,
  calls => calls.filter(c => c.priority === 'High')
);

export const getHighCallsStarted = createSelector(
  getCalls,
  calls => calls.filter(c => c.priority === 'High' && c.completionDate === '').length
);

export const getHighCallsCompleted = createSelector(
  getCalls,
  calls => calls.filter(c => c.priority === 'High' && c.completionDate !== '').length
);

export const getMediumCalls = createSelector(
  getCalls,
  calls => calls.filter(c => c.priority === 'Medium')
);

export const getMediumCallsStarted = createSelector(
  getCalls,
  calls => calls.filter(c => c.priority === 'Medium' && c.completionDate === '').length
);

export const getMediumCallsCompleted = createSelector(
  getCalls,
  calls => calls.filter(c => c.priority === 'Medium' && c.completionDate !== '').length
);

export const getLowCalls = createSelector(
  getCalls,
  calls => calls.filter(c => c.priority === 'Low')
);

export const getLowCallsStarted = createSelector(
  getCalls,
  calls => calls.filter(c => c.priority === 'Low' && c.completionDate === '').length
);

export const getLowCallsCompleted = createSelector(
  getCalls,
  calls => calls.filter(c => c.priority === 'Low' && c.completionDate !== '').length
);
