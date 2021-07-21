import axios from 'axios';
import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './register.css';

export const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    const HEROKU = process.env.REACT_APP_PUBLIC_FOLDER_HEROKU;
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(`${HEROKU}auth/register`, user);
        history.push('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="lognDesc">Connect with freiinds from the world</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="text"
              ref={username}
              className="loginInput"
              placeholder="Username"
              required
            />
            <input
              type="email"
              ref={email}
              className="loginInput"
              placeholder="Email"
              required
            />
            <input
              type="password"
              ref={password}
              className="loginInput"
              placeholder="Password"
              required
              minLength="6"
            />
            <input
              type="password"
              ref={passwordAgain}
              className="loginInput"
              placeholder="Password Again"
              required
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
