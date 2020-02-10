#!/bin/bash
CURR_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

pushd $CURR_DIR/
pushd $CURR_DIR/wabac-replay/
yarn install
yarn run build-dev
popd
cp ./wabac-replay/sw.js ./wr-ext/replay/sw.js
mkdir -p ./wr-ext/replay/static/
cp ./wabac-replay/static/* ./wr-ext/replay/static/

popd
