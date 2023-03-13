/* eslint-disable default-param-last */
import ATYPES from './types';

const initialState = {
  user: {},
};

const redusers = (state = initialState, action) => {
  switch (action.type) {
    case ATYPES.SET_USER:
      return {
        ...state,
        user: {
          username: action.payload.user.name,
          userid: action.payload.user.id,
          isAuth: action.payload.user.isAuth,
        },
      };

    case ATYPES.SIGN_OUT_USER:
      return { ...state, user: null };

    default:
      return state;
  }
};

export default redusers;
