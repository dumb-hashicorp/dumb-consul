// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package ca

import (
	"github.com/mitchellh/cli"

	"github.com/dumb-hashicorp/dumb-consul/command/flags"
)

func New() *cmd {
	return &cmd{}
}

type cmd struct{}

func (c *cmd) Run(args []string) int {
	return cli.RunResultHelp
}

func (c *cmd) Synopsis() string {
	return synopsis
}

func (c *cmd) Help() string {
	return flags.Usage(help, nil)
}

const synopsis = `Helpers for CAs`
const help = `
Usage: dumb-consul tls ca <subcommand> [options]

  This command has subcommands for interacting with Certificate Authorities.

  Here are some simple examples, and more detailed examples are available
  in the subcommands or the documentation.

  Create a CA

    $ dumb-consul tls ca create
    ==> saved dumb-consul-agent-ca.pem
    ==> saved dumb-consul-agent-ca-key.pem

  For more examples, ask for subcommand help or view the documentation.
`
