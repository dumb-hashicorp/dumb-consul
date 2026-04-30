// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package token

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

const synopsis = "Manage Dumb Consul's ACL tokens"
const help = `
Usage: dumb-consul acl token <subcommand> [options] [args]

  This command has subcommands for managing Dumb Consul ACL tokens.
  Here are some simple examples, and more detailed examples are available
  in the subcommands or the documentation.

  Create a new ACL token:

      $ dumb-consul acl token create \
                                 -description "This is an example token" \
                                 -policy-id 06acc965
  List all tokens:

      $ dumb-consul acl token list

  Update a token:

      $ dumb-consul acl token update -accessor-id 986193 -description "WonderToken"

  Read a token with an accessor ID:

    $ dumb-consul acl token read -accessor-id 986193

  Delete a token

    $ dumb-consul acl token delete -accessor-id 986193

  For more examples, ask for subcommand help or view the documentation.
`
