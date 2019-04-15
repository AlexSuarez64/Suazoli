import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Call } from '../../../calls/shared/models/call';

export enum CallActionTypes {
  gotoEditCall = '[Call] Goto Edit Call',
  SetCurrentCall = '[Call] Set Current Call',
  ClearCurrentCall = '[Call] Clear Current Call',
  InitializeCurrentCall = '[Call] Initialize Current Call',
  LoadCall = '[Call] Load Call',
  LoadCallFail = '[Call] Load Call Fail',
  LoadCallSuccess = '[Call] Load Call Success',
  LoadCalls = '[Call] Load Calls',
  LoadCallsFail = '[Call] Load Calls Fail',
  LoadCallsSuccess = '[Call] Load Calls Success',
  CreateCall = '[Call] Create Call',
  CreateCallSuccess = '[Call] Create Call Success',
  CreateCallFail = '[Call] Create Call Fail',
  DeleteCall = '[Call] Delete Call',
  DeleteCallSuccess = '[Call] Delete Call Success',
  DeleteCallFail = '[Call] Delete Call Fail',
  UpdateCall = '[Call] Update Call',
  UpdateCallSuccess = '[Call] Update Call Success',
  UpdateCallFail = '[Call] Update Call Fail'
}

export class GotoEditCall implements Action {
  readonly type = CallActionTypes.gotoEditCall;
  constructor(public payload: Call) {}
}
export class CreateCall implements Action {
  readonly type = CallActionTypes.CreateCall;
  constructor(public payload: Call) {}
}
export class CreateCallFail implements Action {
  readonly type = CallActionTypes.CreateCallFail;
  constructor(public payload: any) {}
}
export class CreateCallSuccess implements Action {
  readonly type = CallActionTypes.CreateCallSuccess;
  constructor(public payload: Call) {}
}
export class DeleteCall implements Action {
  readonly type = CallActionTypes.DeleteCall;
  constructor(public payload: Call) {}
}
export class DeleteCallFail implements Action {
  readonly type = CallActionTypes.DeleteCallFail;
  constructor(public payload: any) {}
}
export class DeleteCallSuccess implements Action {
  readonly type = CallActionTypes.DeleteCallSuccess;
  constructor(public payload: Call) {}
}
export class UpdateCall implements Action {
  readonly type = CallActionTypes.UpdateCall;
  constructor(public payload: Call) {}
}
export class UpdateCallFail implements Action {
  readonly type = CallActionTypes.UpdateCallFail;
  constructor(public payload: any) {}
}
export class UpdateCallSuccess implements Action {
  readonly type = CallActionTypes.UpdateCallSuccess;
  constructor(public payload: Update<Call>) {}
}
export class LoadCalls implements Action {
  readonly type = CallActionTypes.LoadCalls;
}
export class LoadCallsFail implements Action {
  readonly type = CallActionTypes.LoadCallsFail;
  constructor(public payload: any) {}
}
export class LoadCallsSuccess implements Action {
  readonly type = CallActionTypes.LoadCallsSuccess;
  constructor(public payload: Call[]) {}
}
export class LoadCall implements Action {
  readonly type = CallActionTypes.LoadCall;
  constructor(public payload: Call) {}
}
export class LoadCallFail implements Action {
  readonly type = CallActionTypes.LoadCallFail;
  constructor(public payload: any) {}
}
export class LoadCallSuccess implements Action {
  readonly type = CallActionTypes.LoadCallSuccess;
  constructor(public payload: Call) {}
}
export class ClearCurrentCall implements Action {
  readonly type = CallActionTypes.ClearCurrentCall;
}
export class SetCurrentCall implements Action {
  readonly type = CallActionTypes.SetCurrentCall;
  constructor(public payload: Call) {}
}
export class InitializeCurrentCall implements Action {
  readonly type = CallActionTypes.InitializeCurrentCall;
}
export type CallsActions =  CreateCall | CreateCallFail | CreateCallSuccess
                         | UpdateCall | UpdateCallFail | UpdateCallSuccess
                         | DeleteCall | DeleteCallFail | DeleteCallSuccess
                         | LoadCall | LoadCallFail | LoadCallSuccess
                         | LoadCalls | LoadCallsFail | LoadCallsSuccess
                         | ClearCurrentCall | SetCurrentCall | InitializeCurrentCall;
