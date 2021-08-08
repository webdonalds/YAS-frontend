import { createAction, ActionType, createReducer } from 'typesafe-actions';

// Action type
const SET_LIKE = 'like/SET_LIKE';


// Action generator
export const setLikeAction = createAction(
  SET_LIKE,
  (value: boolean) => {
    return {
      value: value,
    }
  }
)();

const actions = { setLikeAction };
export type LikeAction = ActionType<typeof actions>;


// State
type LikeState = {
  like: boolean,
};

const initialState = {
  like: false,
};

const likeReducer = createReducer<LikeState, LikeAction>(initialState, {
  [SET_LIKE]: (_, action) => ({
    like: action.payload.value
  }),
});

export default likeReducer;