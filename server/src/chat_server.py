import asyncio
from aiohttp import web

from chat import Chat

# Initialize our chat 'database' that is keeping track of the chats
chat = Chat()
chat.send_message("a", "b", "hello world")
chat.send_message("b", "a", "hello world back to you!")

chat.send_message("a", "c", "i hate you")


# Gets all the receiver of messages from a user
@asyncio.coroutine
def receivers_handler(request):
    username = request.match_info.get("username", None)

    if not username:
        return web.Response(status=404, reason="Username cannot be blank")

    data = {"receivers": list(chat.get_receivers(username))}
    return web.json_response(data)


# Gets the conversation between a user and a receiver
@asyncio.coroutine
def conversation_handler(request):
    username = request.match_info.get("username", None)
    receiver = request.match_info.get("receiver", None)

    if not username or not receiver:
        return web.Response(
            status=404, reason="Username and/or receiver cannot be blank"
        )

    conversation = chat.get_conversation(username, receiver)
    data = {"conversation": conversation}
    return web.json_response(data)


# Sends a message from one user to another
@asyncio.coroutine
async def message_handler(request):
    username = request.match_info.get("username", None)
    receiver = request.match_info.get("receiver", None)
    message = (await request.content.read()).decode("utf-8").strip('"')

    if not username or not receiver or not message:
        return web.Response(
            status=404, reason="Username/receiver and/or message cannot be blank"
        )

    chat.send_message(username, receiver, message)
    return web.json_response({"success": True})


if __name__ == "__main__":
    from app import create_app

    web.run_app(create_app())
