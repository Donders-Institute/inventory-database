#!/bin/bash

echo "starting inventory database ..."
set -a && source env.sh && set +a && docker-compose -f docker-compose.yml up