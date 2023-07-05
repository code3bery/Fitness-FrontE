import React from 'react';
import { login } from '../api';
import { useHistory } from 'react-router-dom';

const UserLogin = ({ updateToken, existingToken }) => {
  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');
  const navigate = useHistory();

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setErrMsg(''); 
    try {
      const apiResponse = await login(user, pass);
      if (apiResponse.token) {
        updateToken(apiResponse.token);
        navigate.push('/');
      } else {
        setErrMsg('Invalid username or password. Try again.');
      }
      or
    } catch (error) {
      setErrMsg('An error occurred during login. Try again.');
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={user}
          onChange={(event) => setUser(event.target.value)}
          required
          minLength={3}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={pass}
          onChange={(event) => setPass(event.target.value)}
          required
          minLength={6}
        />
      </div>
      <button type="submit">Login</button>
      {errMsg && <p className="error-message">{errMsg}</p>} 
    </form>
  );
};

export default UserLogin;
