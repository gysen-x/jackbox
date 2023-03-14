/* eslint-disable default-param-last */
import ATYPES from './types';

const initialState = {
  user: null,
};

const redusers = (state = initialState, action) => {
  switch (action.type) {
    case ATYPES.SET_USER:
      return {
        ...state,
        user: {
          username: action.payload.user.name,
          userid: action.payload.user.id,
        },
      };

    case ATYPES.SIGN_OUT_USER:
      console.log(1);
      localStorage.removeItem('token');
      return { ...state, user: null };

    default:
      return state;
  }
};

export default redusers;
