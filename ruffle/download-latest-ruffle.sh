#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

RUFFLE_DIR=$SCRIPT_DIR

SELFHOST_URL=$(curl "https://api.github.com/repos/ruffle-rs/ruffle/releases" | jq -r '.[0].assets[] | select(.name | contains("selfhosted")) | .browser_download_url')

echo "$SELFHOST_URL"

curl -L -o $RUFFLE_DIR/ruffle.zip "$SELFHOST_URL"

rm $RUFFLE_DIR/*.js $RUFFLE_DIR/*.wasm

cd $RUFFLE_DIR
unzip $RUFFLE_DIR/ruffle.zip *.js *.wasm

rm $RUFFLE_DIR/ruffle.zip
