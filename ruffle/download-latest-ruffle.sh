#!/bin/bash
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

RUFFLE_DIR=$SCRIPT_DIR

if [ -z "$GH_TOKEN" ]; then
  SELFHOST_URL=$(curl -s "https://api.github.com/repos/ruffle-rs/ruffle/releases" | jq -r '.[0].assets[] | select(.name | contains("selfhosted")) | .browser_download_url')
else
  SELFHOST_URL=$(curl -s --header "Authorization: Bearer $GH_TOKEN" "https://api.github.com/repos/ruffle-rs/ruffle/releases" | jq -r '.[0].assets[] | select(.name | contains("selfhosted")) | .browser_download_url')
fi

echo "$SELFHOST_URL"

curl -L -o "$RUFFLE_DIR/ruffle.zip" "$SELFHOST_URL"

rm "$RUFFLE_DIR/*.js" "$RUFFLE_DIR/*.wasm"

cd "$RUFFLE_DIR" || exit 1
unzip "$RUFFLE_DIR/ruffle.zip" "*.js" "*.wasm"

rm "$RUFFLE_DIR/ruffle.zip"
