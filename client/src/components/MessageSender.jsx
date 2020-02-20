import React from 'react';

import { sendMessage } from 'src/api/requests';

const MessageSender = ({ username, receiver }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const message = e.currentTarget.message.value;
    sendMessage(username, receiver, message);
    e.currentTarget.reset(); // by default clear the input
  };

  return (
    <div>
      <div>Sending message to <i>{receiver}</i>:</div>
      <form onSubmit={submitHandler}>
        <input type="text" name="message" />
        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
};

export default MessageSender;
