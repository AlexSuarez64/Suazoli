import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError, take, filter } from 'rxjs/operators';

import { CallsState, getCallsState } from '../../store/reducers/calls.reducer';
import * as fromA from '../../store/actions';
import * as fromApp from '../../../store/actions';

// import { CallEditComponent } from '../containers/call-edit.component';

@Injectable()
export  class CallDetailGuard implements CanActivate {

    constructor(private router: Router, private store: Store<CallsState>) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const id = +route.url[1].path;
        if (isNaN(id) || id < 0 ) {
            alert('Invalid call Id');
            // start a new navigation to redirect to list page
            this.store.dispatch(new fromApp.Go({ path: ['/calls'] }));
            // abort current navigation
            return false;
        }
        return true;
    }
}

@Injectable()
export class CallsGuard implements CanActivate {
  constructor(private store: Store<CallsState>) {}

  getFromStoreOrAPI(): Observable<any> {
    return this.store.select(getCallsState).pipe(
      tap((data: any) => {
        if (!data.calls.length) {
          this.store.dispatch(new fromA.LoadCalls());
        }
      }),
      filter((data: any) => data.calls.length),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.getFromStoreOrAPI().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}

// @Injectable()
// export  class CallEditGuard implements CanDeactivate<CallEditComponent> {

//     canDeactivate(component: CallEditComponent): boolean {
//         if (component.callForm.dirty) {
//             let name = component.callForm.get('name').value || 'New Call';
//             return confirm(`Navigate away and lose all changes to ${name}?`);
//         }
//         return true;
//     }
// }

