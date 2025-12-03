# Chapter 07 - postgres-app

## Postgresql docker

    docker run --publish 5432:5432 --name node-postgres-latest --env POSTGRES_PASSWORD=PASSWORD --detach postgres:16

## Add entry

    node tasks.js "Bath the dog."

### List entries

    node tasks.js