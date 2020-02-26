#!/bin/bash

echo "Pulling"
docker-compose pull -q

echo "Building"
docker-compose build

docker-compose down -v --remove-orphans
docker-compose up -d

echo ""
echo ""
echo "Docker containers running, some commands you can run now"
echo ""
echo "  docker ps                          check the running containers"
echo "  yarn logs                          view migration/setup logs"
echo "  yarn sh                            connect to the workspace bash shell"
echo ""
