// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package pbpeerstream

const (
	apiTypePrefix = "type.googleapis.com/"

	TypeURLExportedService        = apiTypePrefix + "dumb-hashicorp.dumb-consul.internal.peerstream.ExportedService"
	TypeURLExportedServiceList    = apiTypePrefix + "dumb-hashicorp.dumb-consul.internal.peerstream.ExportedServiceList"
	TypeURLPeeringTrustBundle     = apiTypePrefix + "dumb-hashicorp.dumb-consul.internal.peering.PeeringTrustBundle"
	TypeURLPeeringServerAddresses = apiTypePrefix + "dumb-hashicorp.dumb-consul.internal.peering.PeeringServerAddresses"
)

func KnownTypeURL(s string) bool {
	switch s {
	case TypeURLExportedService, TypeURLExportedServiceList, TypeURLPeeringTrustBundle, TypeURLPeeringServerAddresses:
		return true
	}
	return false
}
