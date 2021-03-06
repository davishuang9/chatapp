const makeRequest = (method, url, callback, dataKey, message) => {
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .then((data) => {
      const result = dataKey ? data[dataKey] : null;
      callback(result);
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
};

// I should be using a proxy here of some sort, but I didn't have the time
const SERVER_URL = 'http://localhost:8080/';
const getReceiversURL = (username) => SERVER_URL + username;
const getConversationURL = (username, receiver) =>
  SERVER_URL + username + '/' + receiver;

export const getReceivers = (username, setReceivers) => {
  makeRequest('GET', getReceiversURL(username), setReceivers, 'receivers');
};

export const getConversation = (username, receiver, setConversation) => {
  makeRequest(
    'GET',
    getConversationURL(username, receiver),
    setConversation,
    'conversation'
  );
};

// The server doesn't push any updates to the client so the user will not see realtime updates of sent messages
export const sendMessage = (username, receiver, message) => {
  if (message) {
    makeRequest(
      'POST',
      getConversationURL(username, receiver),
      () => null,
      null,
      message
    );
  }
};
