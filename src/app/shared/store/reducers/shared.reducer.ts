import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { CallsActions, CallActionTypes } from '../actions/shared.actions';
import { Call } from '../../../calls/shared/models/call';

export const getCallsState = createFeatureSelector<CallsState>('calls');

export interface CallsState extends EntityState<Call> {
  error: string;
  loaded: boolean;
}

export const adapter: EntityAdapter<Call> = createEntityAdapter<Call>();

export const initialCallsState: CallsState = adapter.getInitialState({
  error: '',
  loaded: false
});

export function sharedReducer(state = initialCallsState, action: CallsActions): CallsState {

  switch (action.type) {
    case CallActionTypes.LoadCalls: {
        return { ...state, loaded: false };
    }

    case CallActionTypes.LoadCallsSuccess: {
      return adapter.addAll(action.payload, {...state, loaded: true, error: ''});
    }

    case CallActionTypes.LoadCallsFail: {
      return adapter.removeAll({...state, loaded: true, error: action.payload });
    }

    case CallActionTypes.UpdateCallSuccess: {
      return adapter.updateOne(action.payload, {...state, loaded: true, error: ''});
    }

    case CallActionTypes.UpdateCallFail: {
      return { ...state, loaded: true, error: action.payload };
    }

    case CallActionTypes.CreateCallSuccess: {
      return adapter.addOne(action.payload, {...state, loaded: true, error: ''});
    }

    case CallActionTypes.CreateCallFail: {
      return { ...state, loaded: true, error: action.payload };
    }

    case CallActionTypes.DeleteCallSuccess: {
      return adapter.removeOne(action.payload.id, {...state, loaded: true, error: ''});
    }

    case CallActionTypes.DeleteCallFail: {
      return { ...state, loaded: true, error: action.payload };
    }

    default:
      return state;
  }
}
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
