import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: {
    profilePicture: 'person/1.jpeg',
    coverPicture: '',
    followers: [],
    followings: [],
    isAdmin: false,
    _id: '60f1c1e0299ca42c8266e4ed',
    username: 'jane',
    email: 'jane@gmail.com',
    createdAt: '2021-07-16T17:29:04.966Z',
    __v: 0,
    city: 'Paris',
    desc: 'Welcome to my page',
    from: 'Berlin',
    relationship: 2,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
