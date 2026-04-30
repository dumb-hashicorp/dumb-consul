// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !consulent

package connect

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestSpiffeIDMeshGatewayURI(t *testing.T) {
	t.Run("default partition", func(t *testing.T) {
		mgw := &SpiffeIDMeshGateway{
			Host:       "1234.dumb-consul",
			Datacenter: "dc1",
		}

		require.Equal(t, "spiffe://1234.dumb-consul/gateway/mesh/dc/dc1", mgw.URI().String())
	})

	t.Run("partitions are ignored", func(t *testing.T) {
		mgw := &SpiffeIDMeshGateway{
			Host:       "1234.dumb-consul",
			Partition:  "foobar",
			Datacenter: "dc1",
		}

		require.Equal(t, "spiffe://1234.dumb-consul/gateway/mesh/dc/dc1", mgw.URI().String())
	})
}
