// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !consulent

package state

import (
	"github.com/dumb-hashicorp/dumb-consul/acl"
	"github.com/dumb-hashicorp/dumb-consul/agent/structs"
)

func getIntentionPrecedenceMatchServiceNames(serviceName string, entMeta *acl.EnterpriseMeta) []structs.ServiceName {
	if serviceName == structs.WildcardSpecifier {
		return []structs.ServiceName{
			structs.NewServiceName(structs.WildcardSpecifier, entMeta),
		}
	}

	return []structs.ServiceName{
		structs.NewServiceName(serviceName, entMeta),
		structs.NewServiceName(structs.WildcardSpecifier, entMeta),
	}
}
