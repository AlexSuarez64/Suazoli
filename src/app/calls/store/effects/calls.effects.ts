import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Observable, of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../../app/store';
import * as fromServices from '../../../calls/shared/providers';
import * as fromCalls from '../actions/calls.actions';
import { Call } from '../../../calls/shared/models/call';

@Injectable()
export class CallsEffects {
  public work: Call;
  constructor(
    private actions$: Actions,
    private callsService: fromServices.CallsService
  ) {}

  @Effect()
  loadCalls$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromCalls.CallActionTypes.LoadCalls),
      mergeMap(action =>
        this.callsService
          .getCalls()
          .pipe(
            map((calls: Call[]) => new fromCalls.LoadCallsSuccess(calls)),
            catchError(err => of(new fromCalls.LoadCallsFail(err)))
          )
      )
    );

  @Effect()
  loadCall$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromCalls.CallActionTypes.LoadCall),
      map((action: fromCalls.LoadCall) => action.payload),
      mergeMap((call: Call) =>
        this.callsService
          .getCall(call)
          .pipe(
            map((call: Call) => new fromCalls.LoadCallSuccess(call)),
            catchError(err => of(new fromCalls.LoadCallsFail(err)))
          )
      )
    );

  @Effect()
  createCall$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromCalls.CallActionTypes.CreateCall),
      map((action: fromCalls.CreateCall) => action.payload),
      mergeMap((call: Call) =>
        this.callsService
          .createCall(call)
          .pipe(
            map((call: Call) => new fromCalls.CreateCallSuccess(call)),
            catchError(err => of(new fromCalls.CreateCallFail(err)))
          )
      )
    );

  @Effect()
  updateCall$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromCalls.CallActionTypes.UpdateCall),
      map((action: fromCalls.UpdateCall) => action.payload),
      mergeMap((call: Call) =>
        this.callsService
          .updateCall(call)
          .pipe(
            map(x => new fromCalls.UpdateCallSuccess({ id: call.id, changes: call })),
            catchError(err => of(new fromCalls.UpdateCallFail(err)))
          )
      )
    );

  @Effect()
  deleteCall$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromCalls.CallActionTypes.DeleteCall),
      map((action: fromCalls.DeleteCall) => action.payload),
      mergeMap((call: Call) =>
        this.callsService
          .deleteCall(call)
          .pipe(
            map(x => new fromCalls.DeleteCallSuccess(call)),
            catchError(err => of(new fromCalls.DeleteCallFail(err)))
          )
      )
    );

  @Effect()
  handleCallsSuccess$ = this.actions$
    .pipe(
      ofType(
        fromCalls.CallActionTypes.CreateCallFail,
        fromCalls.CallActionTypes.CreateCallSuccess,
        fromCalls.CallActionTypes.DeleteCallFail,
        fromCalls.CallActionTypes.DeleteCallSuccess,
        fromCalls.CallActionTypes.UpdateCallFail,
        fromCalls.CallActionTypes.UpdateCallSuccess
      ),
      map(call => {
        return new fromRoot.Go({ path: ['/calls'] });
      })
    );

    
  // @Effect()
  // loadCalls$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromCalls.CallActionTypes.LoadCalls),
  //     tap(action => console.log(`Received ${action}`)),
  //     mergeMap(action =>
  //       this.callsService
  //         .getCalls()
  //         .pipe(
  //           tap(action => console.log(`Load Calls Service Completed ${action}`)),
  //           map((calls: Call[]) => new fromCalls.LoadCallsSuccess(calls)),
  //           catchError(err => of(new fromCalls.LoadCallsFail(err)))
  //         )
  //     )
  //   );

  // @Effect()
  // loadCall$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromCalls.CallActionTypes.LoadCall),
  //     tap(action => console.log(`Received ${action}`)),
  //     map((action: fromCalls.LoadCall) => action.payload),
  //     mergeMap((call: Call) =>
  //       this.callsService
  //         .getCall(call)
  //         .pipe(
  //           tap(action => console.log(`Load Call Service Completed ${action}`)),
  //           map((call: Call) => new fromCalls.LoadCallSuccess(call)),
  //           catchError(err => of(new fromCalls.LoadCallsFail(err)))
  //         )
  //     )
  //   );

  // @Effect()
  // createCall$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromCalls.CallActionTypes.CreateCall),
  //     tap(action => console.log(`Received ${action}`)),
  //     map((action: fromCalls.CreateCall) => action.payload),
  //     mergeMap((call: Call) =>
  //       this.callsService
  //         .createCall(call)
  //         .pipe(
  //           tap(action => console.log(`Create Call Service Completed ${action}`)),
  //           map((call: Call) => new fromCalls.CreateCallSuccess(call)),
  //           catchError(err => of(new fromCalls.CreateCallFail(err)))
  //         )
  //     )
  //   );

  // @Effect()
  // updateCall$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromCalls.CallActionTypes.UpdateCall),
  //     tap(action => console.log(`Received ${action}`)),
  //     map((action: fromCalls.UpdateCall) => action.payload),
  //     mergeMap((call: Call) =>
  //       this.callsService
  //         .updateCall(call)
  //         .pipe(
  //           tap(action => console.log(`Update Call Service Completed ${action}`)),
  //           map(x => new fromCalls.UpdateCallSuccess({ id: call.id, changes: call })),
  //           catchError(err => of(new fromCalls.UpdateCallFail(err)))
  //         )
  //     )
  //   );

  // @Effect()
  // deleteCall$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromCalls.CallActionTypes.DeleteCall),
  //     tap(action => console.log(`Received ${action}`)),
  //     map((action: fromCalls.DeleteCall) => action.payload),
  //     mergeMap((call: Call) =>
  //       this.callsService
  //         .deleteCall(call)
  //         .pipe(
  //           tap(action => console.log(`Delete Call Service Completed ${action}`)),
  //           map(x => new fromCalls.DeleteCallSuccess(call)),
  //           catchError(err => of(new fromCalls.DeleteCallFail(err)))
  //         )
  //     )
  //   );

  // @Effect()
  // handleCallsSuccess$ = this.actions$
  //   .pipe(
  //     ofType(
  //       fromCalls.CallActionTypes.CreateCallFail,
  //       fromCalls.CallActionTypes.CreateCallSuccess,
  //       fromCalls.CallActionTypes.DeleteCallFail,
  //       fromCalls.CallActionTypes.DeleteCallSuccess,
  //       fromCalls.CallActionTypes.UpdateCallFail,
  //       fromCalls.CallActionTypes.UpdateCallSuccess
  //     ),
  //     map(call => {
  //       return new fromRoot.Go({ path: ['/calls'] });
  //     })
  //   );

}
