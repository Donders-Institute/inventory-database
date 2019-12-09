#!/bin/bash

echo "building inventory database containers ..."
# set -a && source env.sh && set +a && docker-compose -f docker-compose.yml build --force-rm
set -a && source env.sh && set +a && docker-compose -f docker-compose.yml build