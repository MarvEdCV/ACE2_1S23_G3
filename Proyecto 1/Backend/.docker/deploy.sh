#!/bin/bash
stack_name="backend"
network_name="backend-network"
script_path=$(dirname "$0")
force_update=false

if [ "$#" -eq 1 ] && [ "$1" == "--force-update" ]; then
  force_update=true
fi

echo -e "\n====== deploy info ==========================="
echo "Stack name: ${stack_name}"
echo "Network name: ${stack_name}"
echo "Force update: ${force_update}"
echo -e "================================================\n"

if [ -z $(docker network ls --filter=scope=swarm --filter=name=${network_name} -q) ]; then
  echo "Creating network ${network_name}";
  docker network create -d overlay --attachable ${network_name}
else
    echo "Network already exists, skipped"
fi

if [ -z $(docker stack ls --format "{{.Name}}" | grep "${stack_name}") ] || [ "$force_update" == true ]; then
  echo "Updating stack...."
  docker stack deploy -c ${script_path}/docker-compose.yml ${stack_name}
  echo "Update completed!"
else
  echo "Stack already exist, skipped"
fi