from collections import defaultdict
import datetime

# Using a class wrapping a dictionary to represent a DB of sorts that is keeping track of all the chats in memory
class Chat:
    def __init__(self):
        # Data structure is structured like:
        # { sender_username: { receiver_username1: [list of messages], receiver_username2: [list of messages], ... }, ... }
        # Messages are tuples of the user that sent it, the string itself, and the timestamp the message was sent, like:
        # (user, string of message, timestamp)
        self.chats = defaultdict(lambda: defaultdict(list))

    # Send a message from user to receiver
    def send_message(self, user, receiver, message):
        receivers = self.chats[user]
        receivers[receiver].append((user, message, datetime.datetime.utcnow()))

    # Get all the receivers of messages for user
    def get_receivers(self, user):
        return self.chats[user].keys()

    # Get both sides of the conversation for user and receiver (all messages sent to each other)
    # Returns a list of messages sorted by timestamp
    def get_conversation(self, user, receiver):
        user_to_receiver = self.chats[user][receiver]
        receiver_to_user = self.chats[receiver][user]
        return list(
            map(
                lambda message: (message[0], message[1], message[2].timestamp()),
                sorted(
                    user_to_receiver + receiver_to_user, key=lambda message: message[2]
                ),
            )
        )
