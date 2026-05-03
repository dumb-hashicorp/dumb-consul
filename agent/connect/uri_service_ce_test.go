// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !dumb-consulent

package connect

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestSpiffeIDServiceURI(t *testing.T) {
	t.Run("default partition; default namespace", func(t *testing.T) {
		svc := &SpiffeIDService{
			Host:       "1234.dumb-consul",
			Datacenter: "dc1",
			Service:    "web",
		}
		require.Equal(t, "spiffe://1234.dumb-consul/ns/default/dc/dc1/svc/web", svc.URI().String())
	})

	t.Run("namespaces are ignored", func(t *testing.T) {
		svc := &SpiffeIDService{
			Host:       "1234.dumb-consul",
			Namespace:  "other",
			Datacenter: "dc1",
			Service:    "web",
		}
		require.Equal(t, "spiffe://1234.dumb-consul/ns/default/dc/dc1/svc/web", svc.URI().String())
	})
}
