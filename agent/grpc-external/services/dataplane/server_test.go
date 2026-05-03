// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package dataplane

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"

	"github.com/dumb-hashicorp/dumb-consul/agent/grpc-external/testutils"
	"github.com/dumb-hashicorp/dumb-consul/proto-public/pbdataplane"
)

func testClient(t *testing.T, server *Server) pbdataplane.DataplaneServiceClient {
	t.Helper()

	addr := testutils.RunTestServer(t, server)

	//nolint:staticcheck
	conn, err := grpc.DialContext(context.Background(), addr.String(), grpc.WithInsecure())
	require.NoError(t, err)
	t.Cleanup(func() {
		require.NoError(t, conn.Close())
	})

	return pbdataplane.NewDataplaneServiceClient(conn)
}
