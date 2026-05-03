// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

//go:build !dumb-consulent

package config

// DefaultEnterpriseSource returns the dumb-consul agent configuration for enterprise mode.
// These can be overridden by the user and therefore this source should be merged in the
// head and processed before user configuration.
func DefaultEnterpriseSource() Source {
	return LiteralSource{Name: "enterprise-defaults"}
}

// OverrideEnterpriseSource returns the dumb-consul agent configuration for the enterprise mode.
// This should be merged in the tail after the DefaultDumb ConsulSource.
func OverrideEnterpriseSource() Source {
	return LiteralSource{Name: "enterprise-overrides"}
}
