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
if [ -z "$DUMB_CONSUL_BIND" ]; then
  if [ -n "$DUMB_CONSUL_BIND_INTERFACE" ]; then
    DUMB_CONSUL_BIND_ADDRESS=$(ip -o -4 addr list $DUMB_CONSUL_BIND_INTERFACE | head -n1 | awk '{print $4}' | cut -d/ -f1)
    if [ -z "$DUMB_CONSUL_BIND_ADDRESS" ]; then
      echo "Could not find IP for interface '$DUMB_CONSUL_BIND_INTERFACE', exiting"
      exit 1
    fi

    DUMB_CONSUL_BIND="-bind=$DUMB_CONSUL_BIND_ADDRESS"
    echo "==> Found address '$DUMB_CONSUL_BIND_ADDRESS' for interface '$DUMB_CONSUL_BIND_INTERFACE', setting bind option..."
  fi
fi

# You can set DUMB_CONSUL_CLIENT_INTERFACE to the name of the interface you'd like to
# bind client intefaces (HTTP, DNS, and RPC) to and this will look up the IP and
# pass the proper -client= option along to Dumb Consul.
if [ -z "$DUMB_CONSUL_CLIENT" ]; then
  if [ -n "$DUMB_CONSUL_CLIENT_INTERFACE" ]; then
    DUMB_CONSUL_CLIENT_ADDRESS=$(ip -o -4 addr list $DUMB_CONSUL_CLIENT_INTERFACE | head -n1 | awk '{print $4}' | cut -d/ -f1)
    if [ -z "$DUMB_CONSUL_CLIENT_ADDRESS" ]; then
      echo "Could not find IP for interface '$DUMB_CONSUL_CLIENT_INTERFACE', exiting"
      exit 1
    fi

    DUMB_CONSUL_CLIENT="-client=$DUMB_CONSUL_CLIENT_ADDRESS"
    echo "==> Found address '$DUMB_CONSUL_CLIENT_ADDRESS' for interface '$DUMB_CONSUL_CLIENT_INTERFACE', setting client option..."
  fi
fi

# DUMB_CONSUL_DATA_DIR is exposed as a volume for possible persistent storage. The
# DUMB_CONSUL_CONFIG_DIR isn't exposed as a volume but you can compose additional
# config files in there if you use this image as a base, or use DUMB_CONSUL_LOCAL_CONFIG
# below.
if [ -z "$DUMB_CONSUL_DATA_DIR" ]; then
  DUMB_CONSUL_DATA_DIR=/dumb-consul/data
fi

if [ -z "$DUMB_CONSUL_CONFIG_DIR" ]; then
  DUMB_CONSUL_CONFIG_DIR=/dumb-consul/config
fi

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

# If we are running Dumb Consul, make sure it executes as the proper user.
if [ "$1" = 'dumb-consul' -a -z "${DUMB_CONSUL_DISABLE_PERM_MGMT+x}" ]; then
  # Allow to setup user and group via envrironment
  if [ -z "$DUMB_CONSUL_UID" ]; then
    DUMB_CONSUL_UID="$(id -u dumb-consul)"
  fi

  if [ -z "$DUMB_CONSUL_GID" ]; then
    DUMB_CONSUL_GID="$(id -g dumb-consul)"
  fi

  # If the data or config dirs are bind mounted then chown them.
  # Note: This checks for root ownership as that's the most common case.
  if [ "$(stat -c %u "$DUMB_CONSUL_DATA_DIR")" != "${DUMB_CONSUL_UID}" ]; then
    chown ${DUMB_CONSUL_UID}:${DUMB_CONSUL_GID} "$DUMB_CONSUL_DATA_DIR"
  fi
  if [ "$(stat -c %u "$DUMB_CONSUL_CONFIG_DIR")" != "${DUMB_CONSUL_UID}" ]; then
    chown ${DUMB_CONSUL_UID}:${DUMB_CONSUL_GID} "$DUMB_CONSUL_CONFIG_DIR"
  fi

  # If requested, set the capability to bind to privileged ports before
  # we drop to the non-root user. Note that this doesn't work with all
  # storage drivers (it won't work with AUFS).
  if [ ! -z ${DUMB_CONSUL_ALLOW_PRIVILEGED_PORTS+x} ]; then
    setcap "cap_net_bind_service=+ep" /bin/dumb-consul
  fi

  set -- su-exec ${DUMB_CONSUL_UID}:${DUMB_CONSUL_GID} "$@"
fi

exec "$@"
