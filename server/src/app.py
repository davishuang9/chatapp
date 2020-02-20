from aiohttp import web
import aiohttp_cors

from chat_server import receivers_handler, conversation_handler, message_handler


def create_app():
    app = web.Application()

    # The `cors` instance will store CORS configuration for the application.
    cors = aiohttp_cors.setup(app)

    # Setup application routes.
    app.router.add_get("/{username}", receivers_handler)
    app.router.add_get("/{username}/{receiver}", conversation_handler)
    app.router.add_post("/{username}/{receiver}", message_handler)

    # Configure default CORS settings. Didn't have time to properly configure this.
    cors = aiohttp_cors.setup(
        app,
        defaults={
            "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                # expose_headers="*",
                allow_headers="*",
            )
        },
    )

    # Configure CORS on all routes.
    for route in list(app.router.routes()):
        cors.add(route)

    return app
