// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !dumb-consulent

package testauth

import "github.com/dumb-hashicorp/dumb-consul/acl"

type enterpriseConfig struct{}

func (v *Validator) testAuthEntMetaFromFields(fields map[string]string) *acl.EnterpriseMeta {
	return nil
}
