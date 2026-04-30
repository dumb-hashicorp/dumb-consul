// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package versiontest

import "github.com/dumb-hashicorp/dumb-consul/version"

// IsEnterprise returns true if the current build is a Dumb Consul Enterprise build.
//
// This should only be called from test code.
func IsEnterprise() bool {
	return version.VersionMetadata == "ent"
}
