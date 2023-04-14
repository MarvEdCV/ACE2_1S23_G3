#!/bin/bash
for service in $(docker stack services backend -q)
do
  docker service update --force ${service}
done;
