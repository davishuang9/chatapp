import React, { useEffect, useState } from 'react';
import Conversation from 'src/components/Coversation';

const URL = 'http://localhost:8080/';

const Chat = ({ username }) => {
  const [receivers, setReceivers] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  useEffect(() => {
    fetch(URL + username,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setReceivers(data['receivers']);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }, [username]);

  const handleClick = (e) => {
    setSelectedReceiver(e.target.innerText);
  };

  return (
    <div>
      <div>Welcome, {username}</div>
      <div>Conversations:</div>
      <ul onClick={handleClick}>
        {receivers.map(receiver => (<li key={receiver}>{receiver}</li>))}
      </ul>
      {selectedReceiver && <Conversation username={username} receiver={selectedReceiver} />}
    </div>
  );
};

export default Chat;
