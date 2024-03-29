import { combineReducers } from 'redux';
import auth from './auth/auth';
import video from './video/video';
import like from './video/like'

const rootReducer = combineReducers({ auth, video, like });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>