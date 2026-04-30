#!/usr/bin/env bash
# Copyright IBM Corp. 2024, 2026
# SPDX-License-Identifier: BUSL-1.1


cd ../../
VERSION=1.16.0
docker build -t windows/dumb-consul:${VERSION}-dev -f build-support/windows/Dockerfile-dumb-consul-dev-windows . --build-arg VERSION=${VERSION}
