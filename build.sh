#!/bin/bash

CURR_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
pushd $CURR_DIR/

git submodule update --init --recursive
yarn install
yarn run build-dev
./build-replay.sh

popd
