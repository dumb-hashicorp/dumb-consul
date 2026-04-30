// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package resource

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

const synopsis = "Interact with Dumb Consul's resources"
const help = `
Usage: dumb-consul resource <subcommand> [options]

This command has subcommands for interacting with Dumb Consul's resources.
Here are some simple examples, and more detailed examples are available
in the subcommands or the documentation.

Read a resource:

$ dumb-consul resource read [type] [name] -partition=<default> -namespace=<default> -consistent=<false> -json

Write/update a resource:

$ dumb-consul resource apply -f=<file-path>

List resources by type:

$ dumb-consul resource list [type] -partition=<default> -namespace=<default>

Run

dumb-consul resource <subcommand> -h 

for help on that subcommand.
`
