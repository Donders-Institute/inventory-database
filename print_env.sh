#!/bin/bash

echo "# version"
echo "DOCKER_IMAGE_TAG=$DOCKER_IMAGE_TAG"
echo 
echo "# docker registry endpoint"
echo "DOCKER_REGISTRY=$DOCKER_REGISTRY"
echo 
echo "# configuration for inventory database ui"
echo "USER=$USER"
echo "PASSWORD=$PASSWORD"
echo "HOST=$HOST"
echo "PORT=$PORT"
echo
echo "# configuration for project database accesss"
echo "PROJECT_DATABASE_HOST=$PROJECT_DATABASE_HOST"
echo "PROJECT_DATABASE_PORT=$PROJECT_DATABASE_PORT"
echo "PROJECT_DATABASE_USER=$PROJECT_DATABASE_USER"
echo "PROJECT_DATABASE_PASSWORD=$PROJECT_DATABASE_PASSWORD"
echo "PROJECT_DATABASE_NAME=$PROJECT_DATABASE_NAME"