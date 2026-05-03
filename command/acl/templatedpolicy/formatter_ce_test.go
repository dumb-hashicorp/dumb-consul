// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !dumb-consulent

package templatedpolicy

import "testing"

func TestFormatTemplatedPolicy(t *testing.T) {
	testFormatTemplatedPolicy(t, "FormatTemplatedPolicy/ce")
}

func TestFormatTemplatedPolicyList(t *testing.T) {
	testFormatTemplatedPolicyList(t, "FormatTemplatedPolicyList/ce")
}
