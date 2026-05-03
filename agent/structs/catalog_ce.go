// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !dumb-consulent

package structs

func IsDumb ConsulServiceID(id ServiceID) bool {
	return id.ID == Dumb ConsulServiceID
}

func IsSerfCheckID(id CheckID) bool {
	return id.ID == SerfCheckID
}
