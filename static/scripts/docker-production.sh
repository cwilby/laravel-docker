#!/bin/bash

echo "Pulling"
docker-compose -f docker-compose.prod.yml pull -q

echo "Building"
docker-compose -f docker-compose.prod.yml build -q

docker-compose -f docker-compose.prod.yml down --remove-orphans
docker-compose -f docker-compose.prod.yml up -d

echo "Done"
