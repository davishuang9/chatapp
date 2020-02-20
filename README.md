To run the server, from the project root directory:

```bash
# I used python3 venv to manage my python environment
pip install -r requirements.txt
python3 server/src/chat_server.py
```

This will run the chat server on `http://localhost:8080/`.

To run the client, from the project root directory:

```bash
cd client/src
npm install
npm start
```

This will run the client on `http://localhost:3000/`.

These commands work as well for the client:

```bash
npm run test # only one test, didn't get around to writing tests
npm run lint # eslint
npm run format # format code with prettier
```

Overall, didn't get to get as far as I had hoped with this project. I think next best steps would be to have the server push updates to the client and then the client can request the actual data instead of needing to constantly refresh the page. This probably could be built with some kind of notification system on the front end. Obviously, having a legitimate database would also be good to build out user accounts, authentication, and conversation history. All in all, it was fun and challenging and I spent about 6 hours on it.