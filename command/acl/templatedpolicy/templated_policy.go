// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package templatedpolicy

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

const synopsis = "Manage Dumb Consul's ACL templated policies"
const help = `
Usage: dumb-consul acl templated-policy <subcommand> [options] [args]

  This command has subcommands for managing Dumb Consul ACL templated policies.
  Here are some simple examples, and more detailed examples are available
  in the subcommands or the documentation.

  List all templated policies:

      $ dumb-consul acl templated-policy list

  Preview the policy rendered by the ACL templated policy:

      $ dumb-consul acl templated-policy preview -name "builtin/service" -var "name:api"

  Read a templated policy with name:

      $ dumb-consul acl templated-policy read -name "builtin/service"

  For more examples, ask for subcommand help or view the documentation.
`
