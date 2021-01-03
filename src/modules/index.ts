import { combineReducers } from 'redux';
import auth from './auth/auth';
import addVideo from './addVideo/addVideo';

const rootReducer = combineReducers({ auth, addVideo });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>