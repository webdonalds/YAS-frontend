import { createAction, ActionType, createReducer } from 'typesafe-actions';

// Action type
const ADD_TAG = 'video/ADD_TAG';
const DELETE_TAG = 'video/DELETE_TAG';
const SET_VALUE = 'video/SET_VALUE';
const SET_USER = 'video/SET_USER';
const INITIALIZE = 'video/INITIALIZE';


// Action generator
export const addTag = createAction(
  ADD_TAG,
  (value: string) => {
    return {
      value: value,
    }
  }
)();
export const deleteTag = createAction(
  DELETE_TAG,
  (value: string) => {
    return {
      value: value,
    }
  }
)();
export const setValue = createAction(
  SET_VALUE,
  (name: string, value: string) => {
    return {
      name: name,
      value: value,
    }
  }
)();
export const setUser = createAction(
  SET_USER,
  (user: UserData) => {
    return {
      user: user
    }
  }
)();
export const initialize = createAction(INITIALIZE)();

const actions = { addTag, deleteTag, setValue, setUser, initialize };
export type VideoAction = ActionType<typeof actions>;


// State
type VideoState = {
  id: string,
  url: string,
  title: string,
  description: string,
  tags: Array<string>,
  user: UserData | null,
};

const initialState = {
  id: "",
  url: "",
  title: "",
  description: "",
  tags: [],
  user: null,
};

const addVideo = createReducer<VideoState, VideoAction>(initialState, {
  [ADD_TAG]: (state, action) => {
    const newTags = state.tags;
    newTags.push(action.payload.value)
    return {
      ...state,
      tags: newTags,
    }
  },
  [DELETE_TAG]: (state, action) => ({
    ...state,
    tags: state.tags.filter(item => (item!=action.payload.value)),
  }),
  [SET_VALUE]: (state, action) => ({
    ...state,
    [action.payload.name]: action.payload.value,
  }),
  [SET_USER]: (state, action) => ({
    ...state,
    user: action.payload.user
  }),
  [INITIALIZE]: () => ({
    id: "",
    url: "",
    title: "",
    description: "",
    tags: [],
    user: null
  }),
});

export default addVideo;