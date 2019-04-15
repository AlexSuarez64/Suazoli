import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../store';
import * as fromServices from '../../../calls/shared/providers';
import * as fromShared from '../actions/shared.actions';
import { Call } from '../../../calls/shared/models/call';

@Injectable()
export class SharedEffects {
  public work: Call;

  @Effect()
  loadCalls$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromShared.CallActionTypes.LoadCalls),
      mergeMap(action =>
        this.callsService
          .getCalls()
          .pipe(
            map((calls: Call[]) => new fromShared.LoadCallsSuccess(calls)),
            catchError(err => of(new fromShared.LoadCallsFail(err)))
          )
      )
    );

  @Effect()
  loadCall$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromShared.CallActionTypes.LoadCall),
      map((action: fromShared.LoadCall) => action.payload),
      mergeMap((call: Call) =>
        this.callsService
          .getCall(call)
          .pipe(
            map((call: Call) => new fromShared.LoadCallSuccess(call)),
            catchError(err => of(new fromShared.LoadCallsFail(err)))
          )
      )
    );

  @Effect()
  createCall$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromShared.CallActionTypes.CreateCall),
      map((action: fromShared.CreateCall) => action.payload),
      mergeMap((call: Call) =>
        this.callsService
          .createCall(call)
          .pipe(
            map((call: Call) => new fromShared.CreateCallSuccess(call)),
            catchError(err => of(new fromShared.CreateCallFail(err)))
          )
      )
    );

  @Effect()
  updateCall$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromShared.CallActionTypes.UpdateCall),
      map((action: fromShared.UpdateCall) => action.payload),
      mergeMap((call: Call) =>
        this.callsService
          .updateCall(call)
          .pipe(
            map(x => new fromShared.UpdateCallSuccess({ id: call.id, changes: call })),
            catchError(err => of(new fromShared.UpdateCallFail(err)))
          )
      )
    );

  @Effect()
  deleteCall$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromShared.CallActionTypes.DeleteCall),
      map((action: fromShared.DeleteCall) => action.payload),
      mergeMap((call: Call) =>
        this.callsService
          .deleteCall(call)
          .pipe(
            map(x => new fromShared.DeleteCallSuccess(call)),
            catchError(err => of(new fromShared.DeleteCallFail(err)))
          )
      )
    );

  @Effect()
  handleCallsSuccess$: Observable<Action> = this.actions$
    .pipe(
      ofType(
        fromShared.CallActionTypes.CreateCallFail,
        fromShared.CallActionTypes.CreateCallSuccess,
        fromShared.CallActionTypes.DeleteCallFail,
        fromShared.CallActionTypes.DeleteCallSuccess,
        fromShared.CallActionTypes.UpdateCallFail,
        fromShared.CallActionTypes.UpdateCallSuccess
      ),
      map(call => {
        return new fromRoot.Go({ path: ['/calls'] });
      })
    );

    constructor(
      private actions$: Actions,
      private callsService: fromServices.CallsService
    ) {}

  // @Effect()
  // loadCalls$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromShared.CallActionTypes.LoadCalls),
  //     tap(action => console.log(`Received ${action}`)),
  //     mergeMap(action =>
  //       this.callsService
  //         .getCalls()
  //         .pipe(
  //           tap(action => console.log(`Load Calls Service Completed ${action}`)),
  //           map((calls: Call[]) => new fromShared.LoadCallsSuccess(calls)),
  //           catchError(err => of(new fromShared.LoadCallsFail(err)))
  //         )
  //     )
  //   );

  // @Effect()
  // loadCall$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromShared.CallActionTypes.LoadCall),
  //     tap(action => console.log(`Received ${action}`)),
  //     map((action: fromShared.LoadCall) => action.payload),
  //     mergeMap((call: Call) =>
  //       this.callsService
  //         .getCall(call)
  //         .pipe(
  //           tap(action => console.log(`Load Call Service Completed ${action}`)),
  //           map((call: Call) => new fromShared.LoadCallSuccess(call)),
  //           catchError(err => of(new fromShared.LoadCallsFail(err)))
  //         )
  //     )
  //   );

  // @Effect()
  // createCall$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromShared.CallActionTypes.CreateCall),
  //     tap(action => console.log(`Received ${action}`)),
  //     map((action: fromShared.CreateCall) => action.payload),
  //     mergeMap((call: Call) =>
  //       this.callsService
  //         .createCall(call)
  //         .pipe(
  //           tap(action => console.log(`Create Call Service Completed ${action}`)),
  //           map((call: Call) => new fromShared.CreateCallSuccess(call)),
  //           catchError(err => of(new fromShared.CreateCallFail(err)))
  //         )
  //     )
  //   );

  // @Effect()
  // updateCall$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromShared.CallActionTypes.UpdateCall),
  //     tap(action => console.log(`Received ${action}`)),
  //     map((action: fromShared.UpdateCall) => action.payload),
  //     mergeMap((call: Call) =>
  //       this.callsService
  //         .updateCall(call)
  //         .pipe(
  //           tap(action => console.log(`Update Call Service Completed ${action}`)),
  //           map(x => new fromShared.UpdateCallSuccess({ id: call.id, changes: call })),
  //           catchError(err => of(new fromShared.UpdateCallFail(err)))
  //         )
  //     )
  //   );

  // @Effect()
  // deleteCall$: Observable<Action> = this.actions$
  //   .pipe(
  //     ofType(fromShared.CallActionTypes.DeleteCall),
  //     tap(action => console.log(`Received ${action}`)),
  //     map((action: fromShared.DeleteCall) => action.payload),
  //     mergeMap((call: Call) =>
  //       this.callsService
  //         .deleteCall(call)
  //         .pipe(
  //           tap(action => console.log(`Delete Call Service Completed ${action}`)),
  //           map(x => new fromShared.DeleteCallSuccess(call)),
  //           catchError(err => of(new fromShared.DeleteCallFail(err)))
  //         )
  //     )
  //   );

  // @Effect()
  // handleCallsSuccess$ = this.actions$
  //   .pipe(
  //     ofType(
  //       fromShared.CallActionTypes.CreateCallFail,
  //       fromShared.CallActionTypes.CreateCallSuccess,
  //       fromShared.CallActionTypes.DeleteCallFail,
  //       fromShared.CallActionTypes.DeleteCallSuccess,
  //       fromShared.CallActionTypes.UpdateCallFail,
  //       fromShared.CallActionTypes.UpdateCallSuccess
  //     ),
  //     map(call => {
  //       return new fromRoot.Go({ path: ['/calls'] });
  //     })
  //   );

}
