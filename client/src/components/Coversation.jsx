import React, { useEffect, useState } from 'react';

import { getConversation } from 'src/api/requests';
import MessageSender from 'src/components/MessageSender';

const Conversation = ({ username, receiver }) => {
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    getConversation(username, receiver, setConversation);
  }, [username, receiver]);

  return (
    <div>
      <div>Conversation with <i>{receiver}</i>:</div>
      {conversation.map((message, index) => {
        const [sender, message_text, timestamp] = message;
        const direction = sender === username ? 'To' : 'From';
        return (
          <div key={`${sender}-${message_text}-${timestamp}-${index}`}>
            <div><b>{direction}</b> <i>{receiver}</i>:</div>
            <div>{message_text}</div>
          </div>
        );
      })}
      <MessageSender username={username} receiver={receiver} />
    </div>
  );
};

export default Conversation;
