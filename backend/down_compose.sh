#!/bin/bash

docker compose -p dev_radar -f docker-compose.yml down
docker rmi dev_radar-node