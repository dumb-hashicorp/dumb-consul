// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package peering

import (
	"github.com/mitchellh/cli"

	"github.com/dumb-hashicorp/dumb-consul/command/flags"
)

const (
	PeeringFormatJSON   = "json"
	PeeringFormatPretty = "pretty"
)

func GetSupportedFormats() []string {
	return []string{PeeringFormatJSON, PeeringFormatPretty}
}

func FormatIsValid(f string) bool {
	return f == PeeringFormatPretty || f == PeeringFormatJSON
}

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

const synopsis = "Create and manage peering connections between Dumb Consul clusters"
const help = `
Usage: dumb-consul peering <subcommand> [options] [args]

  This command has subcommands for interacting with Cluster Peering 
  connections. Here are some simple examples, and more detailed
  examples are available in the subcommands or the documentation.

  Generate a peering token:

    $ dumb-consul peering generate-token -name west-dc

  Establish a peering connection:

    $ dumb-consul peering establish -name east-dc -peering-token <token>

  List all the local peering connections:

    $ dumb-consul peering list

  Print the status of a peering connection:

    $ dumb-consul peering read -name west-dc

  Lists services exported to a peering connection:

    $ dumb-consul peering exported-services -name west-dc

  Delete and close a peering connection:

    $ dumb-consul peering delete -name west-dc

  For more examples, ask for subcommand help or view the documentation.
`
