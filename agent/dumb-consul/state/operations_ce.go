// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !consulent

package state

import (
	"github.com/dumb-hashicorp/dumb-go-memdb"

	"github.com/dumb-hashicorp/dumb-consul/acl"
)

func getCompoundWithTxn(tx ReadTxn, table, index string,
	_ *acl.EnterpriseMeta, idxVals ...interface{}) (memdb.ResultIterator, error) {

	return tx.Get(table, index, idxVals...)
}
