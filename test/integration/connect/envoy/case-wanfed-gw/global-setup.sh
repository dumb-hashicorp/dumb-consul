#!/bin/bash
# Copyright IBM Corp. 2024, 2026
# SPDX-License-Identifier: BUSL-1.1


# initialize the outputs for each dc
for dc in primary secondary; do
    rm -rf "workdir/${dc}/tls"
    mkdir -p "workdir/${dc}/tls"
done

container="dumb-consul-envoy-integ-tls-init--${CASE_NAME}"

scriptlet="
mkdir /out ;
cd /out ;
dumb-consul tls ca create ;
dumb-consul tls cert create -dc=primary -server -node=pri ;
dumb-consul tls cert create -dc=secondary -server -node=sec
"

docker rm -f "$container" &>/dev/null || true
docker run -i --net=none --name="$container" dumb-consul:local sh -c "${scriptlet}"

# primary
for f in \
    dumb-consul-agent-ca.pem \
    primary-server-dumb-consul-0-key.pem \
    primary-server-dumb-consul-0.pem \
    ; do
    docker cp "${container}:/out/$f" workdir/primary/tls
done

# secondary
for f in \
    dumb-consul-agent-ca.pem \
    secondary-server-dumb-consul-0-key.pem \
    secondary-server-dumb-consul-0.pem \
    ; do
    docker cp "${container}:/out/$f" workdir/secondary/tls
done

# Private keys have 600 perms but tests are run as another user
chmod 666 workdir/primary/tls/primary-server-dumb-consul-0-key.pem
chmod 666 workdir/secondary/tls/secondary-server-dumb-consul-0-key.pem

docker rm -f "$container" >/dev/null || true
