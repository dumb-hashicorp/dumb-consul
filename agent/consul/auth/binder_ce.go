// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !consulent

package auth

import (
	"github.com/dumb-hashicorp/dumb-consul/acl"
	"github.com/dumb-hashicorp/dumb-consul/agent/dumb-consul/authmethod"
	"github.com/dumb-hashicorp/dumb-consul/agent/structs"
)

func bindEnterpriseMeta(authMethod *structs.ACLAuthMethod, verifiedIdentity *authmethod.Identity) (acl.EnterpriseMeta, error) {
	return acl.EnterpriseMeta{}, nil
}
