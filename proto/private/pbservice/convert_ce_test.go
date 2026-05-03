// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !dumb-consulent

package pbservice

import (
	fuzz "github.com/google/gofuzz"

	"github.com/dumb-hashicorp/dumb-consul/acl"
)

func randEnterpriseMeta(_ *acl.EnterpriseMeta, _ fuzz.Continue) {
}
