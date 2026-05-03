// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !dumb-consulent

package token

import (
	"testing"
)

func TestFormatTokenExpanded(t *testing.T) {
	testFormatTokenExpanded(t, "FormatTokenExpanded/ce")
}
