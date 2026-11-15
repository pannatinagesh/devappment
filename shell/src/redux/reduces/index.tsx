import { combineReducers, Reducer, UnknownAction } from 'redux'
import signinSlice from './sign-in'
import userSlice from './userDetails';
import taskSlice from './task'
export interface RootState {
  signin: ReturnType<typeof signinSlice>
  userDetails: ReturnType<typeof userSlice>
  task: ReturnType<typeof taskSlice>
}

const reducers = combineReducers({
    signin: signinSlice,
    userDetails: userSlice,
    task: taskSlice
});

const rootReducer: Reducer<RootState, UnknownAction> = (state, action) => {
  if (action.type === 'user/logout/fulfilled') {
    return reducers(undefined, action)
  }

  return reducers(state, action)
}

export default rootReducer
