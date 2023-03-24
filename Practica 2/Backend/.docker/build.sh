#!/bin/bash

build_version=$(date +%F.%H%M)
base_image_name=backend
script_path=$(dirname "$0")
context=$script_path/..

echo -e  "\n==== Build info =========================="
echo "Script path: ${script_path}"
echo "Base image name: ${base_image_name}"
echo "Build version: ${build_version}"
echo "Docker context: ${context}"
echo -e "==========================================\n"

echo -e "\n\nBuilding ${base_image_name}:${build_version}.... \n"
docker build -f ${script_path}/Dockerfile -t ${base_image_name}:${build_version} -t ${base_image_name}:latest "${context}"