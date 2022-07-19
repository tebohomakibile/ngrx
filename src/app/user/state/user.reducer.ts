import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from "src/app/state/app.state";
import { toggleMaskUserName } from "./user.action";


export interface State extends AppState.State {
  maskUser: UserState;
}
export interface UserState {
  maskUserName: boolean;
}

const initialState: UserState ={
  maskUserName: true
}

const getUserFeatureState = createFeatureSelector<UserState>('user');
export const getMaskUserName = createSelector(getUserFeatureState, state => state.maskUserName);


export const userReducer = createReducer<UserState>(
  initialState,
  on(toggleMaskUserName, (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    }
  })
)
