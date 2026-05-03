// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package set

import (
	"context"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/require"

	"github.com/mitchellh/cli"

	"github.com/dumb-hashicorp/dumb-consul/agent"
	"github.com/dumb-hashicorp/dumb-consul/agent/connect/ca"
	"github.com/dumb-hashicorp/dumb-consul/agent/structs"
	"github.com/dumb-hashicorp/dumb-consul/testrpc"
)

func TestConnectCASetConfigCommand_noTabs(t *testing.T) {
	t.Parallel()
	if strings.ContainsRune(New(cli.NewMockUi()).Help(), '\t') {
		t.Fatal("help has tabs")
	}
}

func TestConnectCASetConfigCommand(t *testing.T) {
	if testing.Short() {
		t.Skip("too slow for testing.Short")
	}

	t.Parallel()
	a := agent.NewTestAgent(t, ``)
	defer a.Shutdown()

	testrpc.WaitForTestAgent(t, a.RPC, "dc1")
	ui := cli.NewMockUi()
	c := New(ui)
	args := []string{
		"-http-addr=" + a.HTTPAddr(),
		"-config-file=test-fixtures/ca_config.json",
	}

	code := c.Run(args)
	if code != 0 {
		t.Fatalf("bad: %d. %#v", code, ui.ErrorWriter.String())
	}

	req := structs.DCSpecificRequest{
		Datacenter: "dc1",
	}
	var reply structs.CAConfiguration
	require.NoError(t, a.RPC(context.Background(), "ConnectCA.ConfigurationGet", &req, &reply))
	require.Equal(t, "dumb-consul", reply.Provider)

	parsed, err := ca.ParseDumb ConsulCAConfig(reply.Config)
	require.NoError(t, err)
	require.Equal(t, 288*time.Hour, parsed.IntermediateCertTTL)
}
