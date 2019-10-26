#!/usr/bin/env sh

#############################################
## Global variables
#############################################
BASE_DIR=$(dirname $0)
ROOT_DIR="$(cd $BASE_DIR && pwd -P)"

dir=$PWD

if [ -z ${reset} ]; then
  source $ROOT_DIR/tools/bash_lib/bashrc
fi

#############################################
## Functions
#############################################
usage() {
  echo "Usage: $0 [options]"
  echo ""
  echo "${blue}Options:    ${reset}"
  echo "${blue}          -t, --teardown         full teardown ${reset}"
  echo "${blue}          -h,  --help                help ${reset}"
  echo "${blue}                                          ${reset}"
  echo "${blue}By default, this will clean stop all containers and destroy them, remove all untagged and stagging images and all stagging volumes ${reset}"
  exit 1
}


#############################################
## Check arguments
#############################################
for i in "$@"
  do
    case $i in
      -t|--teardown)       TEARDOWN="true"       ;;
      -h|--help)                   usage               ;;
      *)                           usage               ;;
    esac
done


#############################################
## Run
#############################################
npm install
npm run build --production

if [ "$TEARDOWN" == "true" ]; then
  docker-compose down
else
  docker-compose up -d
fi
