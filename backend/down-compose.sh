#!/bin/bash

docker compose -p devradar -f docker-compose.yml down
docker rmi devradar-node
