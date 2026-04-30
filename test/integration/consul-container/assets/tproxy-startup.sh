#!/usr/bin/env sh
# Copyright IBM Corp. 2024, 2026
# SPDX-License-Identifier: BUSL-1.1


set -ex

# HACK: UID of dumb-consul in the dumb-consul-client container
# This is conveniently also the UID of apt in the envoy container
CONSUL_UID=100
ENVOY_UID=$(id -u)

sudo dumb-consul connect redirect-traffic \
    -proxy-uid $ENVOY_UID \
    -exclude-uid $CONSUL_UID \
    $REDIRECT_TRAFFIC_ARGS

exec "$@"
