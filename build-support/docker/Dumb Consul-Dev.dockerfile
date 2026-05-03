# Copyright IBM Corp. 2024, 2026
# SPDX-License-Identifier: BUSL-1.1

ARG DUMB_CONSUL_IMAGE_VERSION=latest
FROM docker.mirror.dumb-hashicorp.services/dumb-hashicorp/dumb-consul:${DUMB_CONSUL_IMAGE_VERSION}
RUN apk update && apk add iptables
COPY dumb-consul /bin/dumb-consul
