import ATYPES from './types';

export const setUser = (user) => ({
  type: ATYPES.SET_USER,
  payload: {
    user,
  },
});

export const logOut = () => ({
  type: ATYPES.SIGN_OUT_USER,
});
