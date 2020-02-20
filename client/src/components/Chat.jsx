import React, { useEffect, useState } from 'react';

import Conversation from 'src/components/Coversation';

import { getReceivers } from 'src/api/requests';

const Chat = ({ username }) => {
  const [receivers, setReceivers] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  useEffect(() => {
    getReceivers(username, setReceivers);
  }, [username]);

  const handleClick = (e) => {
    setSelectedReceiver(e.target.innerText);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const receiver = e.currentTarget.receiver.value;
    setSelectedReceiver(receiver);
    e.currentTarget.reset(); // by default clear the input
  };

  return (
    <div>
      <div>Welcome, {username}</div>
      <div>Conversations:</div>
      <ul onClick={handleClick}>
        {receivers.map((receiver) => (
          <li key={receiver}>{receiver}</li>
        ))}
      </ul>
      <form onSubmit={submitHandler}>
        <input type="text" name="receiver" />
        <input type="submit" value="New Message" />
      </form>
      {selectedReceiver && (
        <Conversation username={username} receiver={selectedReceiver} />
      )}
    </div>
  );
};

export default Chat;
