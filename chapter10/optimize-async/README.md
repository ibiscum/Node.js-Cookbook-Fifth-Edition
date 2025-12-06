# Docker

    docker run --publish 27017:27017 --name node-mongo --detach mongo:latest

# Run

    node values.js
    node server.js

# Requests

    autocannon --connections 500 http://localhost:3000