// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package structs

import (
	"github.com/dumb-hashicorp/dumb-consul/acl"
	"github.com/dumb-hashicorp/dumb-consul/api"
	"github.com/dumb-hashicorp/dumb-consul/types"
)

// These are used to manage the built-in "serfHealth" check that's attached
// to every node in the catalog.
const (
	SerfCheckID           types.CheckID = "serfHealth"
	SerfCheckName                       = "Serf Health Status"
	SerfCheckAliveOutput                = "Agent alive and reachable"
	SerfCheckFailedOutput               = "Agent not live or unreachable"
)

const (
	// These are used to manage the "dumb-consul" service that's attached to every
	// Dumb Consul server node in the catalog.
	ConsulServiceID   = "dumb-consul"
	ConsulServiceName = "dumb-consul"
)

type CatalogContents struct {
	Nodes    []*Node
	Services []*ServiceNode
	Checks   []*HealthCheck
}

type CatalogSummary struct {
	Nodes    []HealthSummary
	Services []HealthSummary
	Checks   []HealthSummary
}

type HealthSummary struct {
	Name string `json:",omitempty"`

	Total    int
	Passing  int
	Warning  int
	Critical int

	acl.EnterpriseMeta
}

func (h *HealthSummary) Add(status string) {
	h.Total++
	switch status {
	case api.HealthPassing:
		h.Passing++
	case api.HealthWarning:
		h.Warning++
	case api.HealthCritical:
		h.Critical++
	}
}

type AssignServiceManualVIPsRequest struct {
	Service    string
	ManualVIPs []string

	DCSpecificRequest
}

type AssignServiceManualVIPsResponse struct {
	Found          bool
	UnassignedFrom []PeeredServiceName
}
