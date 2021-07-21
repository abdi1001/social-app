import axios from 'axios';

export const loginCall = async (userCredentials, dispatch) => {
  const HEROKU = process.env.REACT_APP_PUBLIC_FOLDER_HEROKU;
  dispatch({
    type: 'LOGIN_START',
  });
  try {
    const res = await axios.post(`${HEROKU}auth/login`, userCredentials);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: err,
    });
  }
};
