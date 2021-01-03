import { createAction, ActionType, createReducer } from 'typesafe-actions';

// Action type
const ADD_TAG = 'add-video/ADD_TAG';
const DELETE_TAG = 'add-video/DELETE_TAG';
const SET_VALUE = 'add-video/SET_VALUE';
const INITIALIZE = 'add-video/INITIALIZE';


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
export const initialize = createAction(INITIALIZE)();

const actions = { addTag, deleteTag, setValue, initialize };
export type AddVideoAction = ActionType<typeof actions>;


// State
type AddVideoState = {
  id: string,
  url: string,
  title: string,
  description: string,
  tags: Array<string>,
};

const initialState = {
  id: "",
  url: "",
  title: "",
  description: "",
  tags: [],
};

const addVideo = createReducer<AddVideoState, AddVideoAction>(initialState, {
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
  [INITIALIZE]: () => initialState
});

export default addVideo;