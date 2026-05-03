// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !dumb-consulent

package resource_test

import "github.com/dumb-hashicorp/dumb-consul/acl"

func fillEntMeta(_ *acl.EnterpriseMeta) {}

func fillAuthorizerContext(_ *acl.AuthorizerContext) {}
