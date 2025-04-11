import { combineReducers, Reducer, UnknownAction } from 'redux'
import signinSlice from './sign-in'

export interface RootState {
  signin: ReturnType<typeof signinSlice>
}

const reducers = combineReducers({
    signin: signinSlice,
});

const rootReducer: Reducer<RootState, UnknownAction> = (state, action) => {
  if (action.type === 'user/logout/fulfilled') {
    return reducers(undefined, action)
  }

  return reducers(state, action)
}

export default rootReducer
