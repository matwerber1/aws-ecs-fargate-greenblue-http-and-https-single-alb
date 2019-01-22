# Purpose

Collection of files used to create two ECS services from the same docker image behind a single ALB. The ALB is configured to serve HTTP traffic to one service and HTTPS traffic to the other. Both services are configured to use the new ECS+CodeDeploy green/blue deployment strategy. A single CodePipeline is used to trigger separate green/blue deployments for each service each time a push is made to the docker image in ECR.

# Note

At present, this is an incomplete collection of the files used in the overall architecture.

This is missing a CloudFormation template to create the ALB, listeners, target groups, ECS services, task definitions, etc.