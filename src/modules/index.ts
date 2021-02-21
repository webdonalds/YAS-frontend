import { combineReducers } from 'redux';
import auth from './auth/auth';
import video from './video/video';

const rootReducer = combineReducers({ auth, video });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>