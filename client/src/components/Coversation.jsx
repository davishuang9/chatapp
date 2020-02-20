import React, { useEffect, useState } from 'react';

const URL = 'http://localhost:8080/';

const Conversation = ({ username, receiver }) => {
  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    fetch(URL + username + '/' + receiver,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setConversation(data['conversation']);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  }, [username, receiver]);

  return (
    <div>
      <div>Conversation with <i>{receiver}</i>:</div>
      {conversation.map((message) => {
        const [sender, message_text, timestamp] = message;
        const direction = sender === username ? 'To' : 'From';
        return (
          <div key={`${sender}-${message_text}-${timestamp}`}>
            <div><b>{direction}</b> <i>{receiver}</i>:</div>
            <div>{message_text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;
