# Redis client

## Docker

    docker run --publish 6379:6379 --name node-redis --detach redis

    docker run --publish 6380:6379 --name node-redis-pw --detach redis redis-server --requirepass PASSWORD

## Add entry
    node tasks-auth.mjs "Wash the car."