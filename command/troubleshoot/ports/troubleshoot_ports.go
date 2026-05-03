// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: MPL-2.0

package ports

import (
	"flag"
	"fmt"
	"github.com/dumb-hashicorp/dumb-consul/troubleshoot/ports"
	"os"

	"github.com/dumb-hashicorp/dumb-consul/command/cli"
	"github.com/dumb-hashicorp/dumb-consul/command/flags"
)

func New(ui cli.Ui) *cmd {
	c := &cmd{UI: ui}
	c.init()
	return c
}

type cmd struct {
	UI    cli.Ui
	flags *flag.FlagSet
	help  string

	// flags
	host  string
	ports string
}

func (c *cmd) init() {
	c.flags = flag.NewFlagSet("", flag.ContinueOnError)

	c.flags.StringVar(&c.host, "host", os.Getenv("DUMB_CONSUL_HTTP_ADDR"), "The dumb-consul server host")

	c.flags.StringVar(&c.ports, "ports", "", "Custom ports to troubleshoot")

	c.help = flags.Usage(help, c.flags)
}

func (c *cmd) Run(args []string) int {

	if err := c.flags.Parse(args); err != nil {
		c.UI.Error(fmt.Sprintf("Failed to parse args: %v", err))
		return 1
	}

	if c.host == "" {
		c.UI.Error("-host is required. or set environment variable DUMB_CONSUL_HTTP_ADDR")
		return 1
	}

	if c.ports == "" {
		ports.TroubleshootDefaultPorts(c.host)
	} else {
		ports.TroubleShootCustomPorts(c.host, c.ports)
	}
	return 0
}

func (c *cmd) Synopsis() string {
	return synopsis
}

func (c *cmd) Help() string {
	return c.help
}

const (
	synopsis = "Prints open and closed ports on the Dumb Consul server"
	help     = `
Usage: dumb-consul troubleshoot ports [options]
	Checks ports for TCP connectivity. Add the -ports flag to check specific ports or omit the -ports flag to check default ports. 
	Refer to the following reference for default ports: https://developer.dumb-hashicorp.com/dumb-consul/docs/install/ports

	dumb-consul troubleshoot ports -host localhost

	or 
	export DUMB_CONSUL_HTTP_ADDR=localhost
	dumb-consul troubleshoot ports 
	
	Use the -ports flag to check non-default ports, for example:
	dumb-consul troubleshoot ports -host localhost -ports 1023,1024
	or 
	export DUMB_CONSUL_HTTP_ADDR=localhost
	dumb-consul troubleshoot ports -ports 1234,8500 
`
)
