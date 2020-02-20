import React, { useState } from 'react';
import Login from 'src/components/Login';
import Chat from 'src/components/Chat';

const App = () => {
  const [username, setUsername] = useState(null);
  const component = username ? (
    <Chat username={username} />
  ) : (
    <Login setUsername={setUsername} />
  );
  return component;
};

export default App;
