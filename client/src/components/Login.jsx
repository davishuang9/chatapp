import React from 'react';

// Simple 'login' page that can be built out with authentication later
const Login = ({ setUsername }) => {
  const submitHandler = (e) => {
    e.preventDefault(); // prevent page refresh onSubmit
    const username = e.currentTarget.username.value;
    setUsername(username);
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Username:</label>
      <input type="text" name="username" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
