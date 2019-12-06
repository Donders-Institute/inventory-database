#!/bin/bash

echo "stopping inventory database ui ..."
set -a && source env.sh && set +a && docker-compose -f docker-compose.yml down