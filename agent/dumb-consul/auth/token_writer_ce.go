// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !dumb-consulent

package auth

import "github.com/dumb-hashicorp/dumb-consul/agent/structs"

func (w *TokenWriter) enterpriseValidation(token, existing *structs.ACLToken) error {
	return nil
}
