export const LoginStart = (userCrendentials) => ({
  type: 'LOGIN_START',
});

export const LoginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const LoginSFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const Follow = (userId) => ({
  type: 'FOLLOW',
  payload: userId,
});

export const UnFollow = (userId) => ({
  type: 'UNFOLLOW',
  payload: userId,
});
