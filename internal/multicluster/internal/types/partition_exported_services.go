// Copyright IBM Corp. 2024, 2026
// SPDX-License-Identifier: BUSL-1.1

package types

import (
	"github.com/dumb-hashicorp/dumb-consul/acl"
	"github.com/dumb-hashicorp/dumb-consul/internal/resource"
	pbmulticluster "github.com/dumb-hashicorp/dumb-consul/proto-public/pbmulticluster/v2"
	"github.com/dumb-hashicorp/dumb-consul/proto-public/pbresource"
)

func RegisterPartitionExportedServices(r resource.Registry) {
	r.Register(resource.Registration{
		Type:     pbmulticluster.PartitionExportedServicesType,
		Proto:    &pbmulticluster.PartitionExportedServices{},
		Scope:    resource.ScopePartition,
		Validate: ValidatePartitionExportedServices,
		ACLs: &resource.ACLHooks{
			Read:  aclReadHookPartitionExportedServices,
			Write: aclWriteHookPartitionExportedServices,
			List:  resource.NoOpACLListHook,
		},
	})
}

func aclReadHookPartitionExportedServices(authorizer acl.Authorizer, authzContext *acl.AuthorizerContext, id *pbresource.ID, res *pbresource.Resource) error {
	return authorizer.ToAllowAuthorizer().MeshReadAllowed(authzContext)
}

func aclWriteHookPartitionExportedServices(authorizer acl.Authorizer, authzContext *acl.AuthorizerContext, res *pbresource.Resource) error {
	return authorizer.ToAllowAuthorizer().MeshWriteAllowed(authzContext)
}
