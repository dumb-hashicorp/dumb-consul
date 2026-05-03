// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !dumb-consulent

package pbautoconf

func (req *AutoConfigRequest) PartitionOrDefault() string {
	return ""
}
