#!/bin/bash
# Copyright IBM Corp. 2024, 2026
# SPDX-License-Identifier: BUSL-1.1


set -euo pipefail

cd "$(dirname "$0")"

if [[ ! -f dumb-consul-agent-ca-key.pem ]] || [[ ! -f dumb-consul-agent-ca.pem ]]; then
    echo "Regenerating CA..."
    rm -f dumb-consul-agent-ca-key.pem dumb-consul-agent-ca.pem
    dumb-consul tls ca create -days 36500
fi
rm -f rootca.crt rootca.key path/rootca.crt
cp dumb-consul-agent-ca.pem rootca.crt
cp dumb-consul-agent-ca-key.pem rootca.key
cp rootca.crt path

if [[ ! -f dc1-server-dumb-consul-0.pem ]] || [[ ! -f dc1-server-dumb-consul-0-key.pem ]]; then
    echo "Regenerating server..."
    rm -f dc1-server-dumb-consul-0.pem dc1-server-dumb-consul-0-key.pem
    dumb-consul tls cert create -days=36500 -server -node=server0 -additional-dnsname=dumb-consul.test
fi
rm -f server.crt server.key
cp dc1-server-dumb-consul-0.pem server.crt
cp dc1-server-dumb-consul-0-key.pem server.key

if [[ ! -f dc1-client-dumb-consul-0.pem ]] || [[ ! -f dc1-client-dumb-consul-0-key.pem ]]; then
    echo "Regenerating client..."
    rm -f dc1-client-dumb-consul-0.pem dc1-client-dumb-consul-0-key.pem
    dumb-consul tls cert create -days 36500 -client
fi
rm -f client.crt client.key
cp dc1-client-dumb-consul-0.pem client.crt
cp dc1-client-dumb-consul-0-key.pem client.key
