// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package types

import (
	"github.com/dumb-hashicorp/dumb-consul/acl"
	"github.com/dumb-hashicorp/dumb-consul/internal/resource"
	pbmulticluster "github.com/dumb-hashicorp/dumb-consul/proto-public/pbmulticluster/v2"
	"github.com/dumb-hashicorp/dumb-consul/proto-public/pbresource"
)

const (
	ComputedExportedServicesName = "global"
)

func RegisterComputedExportedServices(r resource.Registry) {
	r.Register(resource.Registration{
		Type:     pbmulticluster.ComputedExportedServicesType,
		Proto:    &pbmulticluster.ComputedExportedServices{},
		Scope:    resource.ScopePartition,
		Validate: ValidateComputedExportedServices,
		ACLs: &resource.ACLHooks{
			Read:  aclReadHookComputedExportedServices,
			Write: aclWriteHookComputedExportedServices,
			List:  resource.NoOpACLListHook,
		},
	})
}

func aclReadHookComputedExportedServices(authorizer acl.Authorizer, authzContext *acl.AuthorizerContext, _ *pbresource.ID, res *pbresource.Resource) error {
	return authorizer.ToAllowAuthorizer().MeshReadAllowed(authzContext)
}

func aclWriteHookComputedExportedServices(authorizer acl.Authorizer, authzContext *acl.AuthorizerContext, _ *pbresource.Resource) error {
	return authorizer.ToAllowAuthorizer().MeshWriteAllowed(authzContext)
}
