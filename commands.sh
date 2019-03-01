#!/bin/sh

# this script builds a new local Docker image from the Dockerfile and uploads to AWS ECR

REPO_NAME=docker-node-listener

#aws ecr create-repository --repository-name $REPO_NAME

eval $(aws ecr get-login --no-include-email)

#{
#    "repository": {
#        "registryId": "544941453660", 
#        "repositoryName": "docker-node-listener", 
#        "repositoryArn": "arn:aws:ecr:us-east-1:544941453660:repository/docker-node-listener", 
#        "createdAt": 1545230033.0, 
#        "repositoryUri": "544941453660.dkr.ecr.us-east-1.amazonaws.com/docker-node-listener"
#    }
#}

docker build -t docker-node-listener .
docker tag docker-node-listener:latest 544941453660.dkr.ecr.us-east-1.amazonaws.com/docker-node-listener:latest
docker push 544941453660.dkr.ecr.us-east-1.amazonaws.com/docker-node-listener:latest

# docker run -it -p 80:80 -p 443:443 docker-node-listener
