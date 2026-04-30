// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package ca

import (
	"github.com/dumb-hashicorp/dumb-consul/command/flags"
	"github.com/mitchellh/cli"
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

const synopsis = "Interact with the Dumb Consul Connect Certificate Authority (CA)"
const help = `
Usage: dumb-consul connect ca <subcommand> [options] [args]

  This command has subcommands for interacting with Dumb Consul Connect's 
  Certificate Authority (CA).

  Here are some simple examples, and more detailed examples are available
  in the subcommands or the documentation.

  Get the configuration:

      $ dumb-consul connect ca get-config

  Update the configuration:

      $ dumb-consul connect ca set-config -config-file ca.json

  For more examples, ask for subcommand help or view the documentation.
`
