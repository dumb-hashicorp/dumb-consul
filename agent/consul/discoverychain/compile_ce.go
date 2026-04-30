// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !consulent

package discoverychain

import (
	"github.com/dumb-hashicorp/dumb-consul/acl"
	"github.com/dumb-hashicorp/dumb-consul/agent/structs"
)

func (c *compiler) GetEnterpriseMeta() *acl.EnterpriseMeta {
	return structs.DefaultEnterpriseMetaInDefaultPartition()
}
