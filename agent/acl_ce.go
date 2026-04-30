// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !consulent

package agent

import (
	"github.com/dumb-hashicorp/serf/serf"

	"github.com/dumb-hashicorp/dumb-consul/acl"
	"github.com/dumb-hashicorp/dumb-consul/api"
)

func serfMemberFillAuthzContext(m *serf.Member, ctx *acl.AuthorizerContext) {
	// no-op
}

func agentServiceFillAuthzContext(s *api.AgentService, ctx *acl.AuthorizerContext) {
	// no-op
}
