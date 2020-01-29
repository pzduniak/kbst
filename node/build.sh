#!/usr/bin/env bash
set -exuo pipefail

here="$(dirname "${BASH_SOURCE[0]}")"
repo="$(git -C "$here" rev-parse --show-toplevel)"

# Build keybase/client
rm -rf .keybaseclient || true
git clone --branch pzduniak/chat-crasher https://github.com/keybase/client.git .keybaseclient
./.keybaseclient/packaging/linux/docker/build.sh crash

# Build the node image
docker build \
    -f "$repo/node/Dockerfile" \
    --build-arg BASE_IMAGE="keybaseio/client:crash-node" \
    -t "pzduniak/kbst:latest" \
    "$repo/node"
