#!/bin/bash

pushd ./wabac-replay/
yarn install
yarn run build-dev
popd
cp ./wabac-replay/sw.js ./wr-ext/replay/sw.js
mkdir -p ./wr-ext/replay/static/
cp ./wabac-replay/static/* ./wr-ext/replay/static/
