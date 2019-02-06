import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions, ofType } from '@ngrx/effects';
import * as RouterActions from '../actions/router.action';

import { tap, map } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .pipe(
      ofType(RouterActions.GO),
      map((action: RouterActions.Go) => action.payload),
      tap(({ path, query: queryParams, extras }) => {
        // console.log('Route', path);
        this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .pipe(
      ofType(RouterActions.BACK),
      tap((action: RouterActions.Back) => console.log(action.type)),
      tap(() => this.location.back())
    );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .pipe(
      ofType(RouterActions.FORWARD),
      tap((action: RouterActions.Back) => console.log(action.type)),
      tap(() => this.location.forward())
    );
}
