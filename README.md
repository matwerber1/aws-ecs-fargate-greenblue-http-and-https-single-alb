# July 2019 UPDATE!!

On July 30, 2019, AWS launched the ability to natively have a single AWS ECS service attached to multiple target groups. This means a single service can listen on both HTTP and HTTPS, be attached to two different target groups, and have one group configured on a port 80/HTTP listener and the other configured on a port 443/HTTPS, behind the same load balancer. 

https://aws.amazon.com/about-aws/whats-new/2019/07/amazon-ecs-services-now-support-multiple-load-balancer-target-groups/

My strategy below was prior to the update above and required running the same container as two separate services, one for HTTP and one for HTTPS, because at that time, an ECS service could only be assigned to one target group. 

The current recommendation is to use the new method above, rather than the method in this project. 

# Purpose

Collection of files used to create two ECS services from the same docker image behind a single ALB. The ALB is configured to serve HTTP traffic to one service and HTTPS traffic to the other. Both services are configured to use the new ECS+CodeDeploy green/blue deployment strategy. A single CodePipeline is used to trigger separate green/blue deployments for each service each time a push is made to the docker image in ECR.

# Note

At present, this is an incomplete collection of the files used in the overall architecture.

This is missing a CloudFormation template to create the ALB, listeners, target groups, ECS services, task definitions, etc.
