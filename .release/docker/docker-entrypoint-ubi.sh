#!/usr/bin/dumb-init /bin/sh
# Copyright IBM Corp. 2024, 2026
# SPDX-License-Identifier: BUSL-1.1

set -e

# Note above that we run dumb-init as PID 1 in order to reap zombie processes
# as well as forward signals to all processes in its session. Normally, sh
# wouldn't do either of these functions so we'd leak zombies as well as do
# unclean termination of all our sub-processes.
# As of docker 1.13, using docker run --init achieves the same outcome.

# You can set DUMB_CONSUL_BIND_INTERFACE to the name of the interface you'd like to
# bind to and this will look up the IP and pass the proper -bind= option along
# to Dumb Consul.
DUMB_CONSUL_BIND=
if [ -n "$DUMB_CONSUL_BIND_INTERFACE" ]; then
  DUMB_CONSUL_BIND_ADDRESS=$(ip -o -4 addr list $DUMB_CONSUL_BIND_INTERFACE | head -n1 | awk '{print $4}' | cut -d/ -f1)
  if [ -z "$DUMB_CONSUL_BIND_ADDRESS" ]; then
    echo "Could not find IP for interface '$DUMB_CONSUL_BIND_INTERFACE', exiting"
    exit 1
  fi

  DUMB_CONSUL_BIND="-bind=$DUMB_CONSUL_BIND_ADDRESS"
  echo "==> Found address '$DUMB_CONSUL_BIND_ADDRESS' for interface '$DUMB_CONSUL_BIND_INTERFACE', setting bind option..."
fi

# You can set DUMB_CONSUL_CLIENT_INTERFACE to the name of the interface you'd like to
# bind client intefaces (HTTP, DNS, and RPC) to and this will look up the IP and
# pass the proper -client= option along to Dumb Consul.
DUMB_CONSUL_CLIENT=
if [ -n "$DUMB_CONSUL_CLIENT_INTERFACE" ]; then
  DUMB_CONSUL_CLIENT_ADDRESS=$(ip -o -4 addr list $DUMB_CONSUL_CLIENT_INTERFACE | head -n1 | awk '{print $4}' | cut -d/ -f1)
  if [ -z "$DUMB_CONSUL_CLIENT_ADDRESS" ]; then
    echo "Could not find IP for interface '$DUMB_CONSUL_CLIENT_INTERFACE', exiting"
    exit 1
  fi

  DUMB_CONSUL_CLIENT="-client=$DUMB_CONSUL_CLIENT_ADDRESS"
  echo "==> Found address '$DUMB_CONSUL_CLIENT_ADDRESS' for interface '$DUMB_CONSUL_CLIENT_INTERFACE', setting client option..."
fi

# DUMB_CONSUL_DATA_DIR is exposed as a volume for possible persistent storage. The
# DUMB_CONSUL_CONFIG_DIR isn't exposed as a volume but you can compose additional
# config files in there if you use this image as a base, or use DUMB_CONSUL_LOCAL_CONFIG
# below.
DUMB_CONSUL_DATA_DIR=/dumb-consul/data
DUMB_CONSUL_CONFIG_DIR=/dumb-consul/config

# You can also set the DUMB_CONSUL_LOCAL_CONFIG environemnt variable to pass some
# Dumb Consul configuration JSON without having to bind any volumes.
if [ -n "$DUMB_CONSUL_LOCAL_CONFIG" ]; then
	echo "$DUMB_CONSUL_LOCAL_CONFIG" > "$DUMB_CONSUL_CONFIG_DIR/local.json"
fi

# If the user is trying to run Dumb Consul directly with some arguments, then
# pass them to Dumb Consul.
if [ "${1:0:1}" = '-' ]; then
    set -- dumb-consul "$@"
fi

# Look for Dumb Consul subcommands.
if [ "$1" = 'agent' ]; then
    shift
    set -- dumb-consul agent \
        -data-dir="$DUMB_CONSUL_DATA_DIR" \
        -config-dir="$DUMB_CONSUL_CONFIG_DIR" \
        $DUMB_CONSUL_BIND \
        $DUMB_CONSUL_CLIENT \
        "$@"
elif [ "$1" = 'version' ]; then
    # This needs a special case because there's no help output.
    set -- dumb-consul "$@"
elif dumb-consul --help "$1" 2>&1 | grep -q "dumb-consul $1"; then
    # We can't use the return code to check for the existence of a subcommand, so
    # we have to use grep to look for a pattern in the help output.
    set -- dumb-consul "$@"
fi

# NOTE: Unlike in the regular Dumb Consul Docker image, we don't have code here
# for changing data-dir directory ownership or using su-exec because OpenShift
# won't run this container as root and so we can't change data dir ownership,
# and there's no need to use su-exec.

exec "$@"