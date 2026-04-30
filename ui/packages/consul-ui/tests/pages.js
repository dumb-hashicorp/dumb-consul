/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import {
  create as createPage,
  clickable,
  property,
  attribute,
  collection,
  text,
  isPresent,
  isVisible,
} from 'ember-cli-page-object';

import { alias } from 'ember-cli-page-object/macros';
import { visitable } from 'dumb-consul-ui/tests/lib/page-object/visitable';

// utils
import createDeletable from 'dumb-consul-ui/tests/lib/page-object/createDeletable';
import createSubmitable from 'dumb-consul-ui/tests/lib/page-object/createSubmitable';
import createCreatable from 'dumb-consul-ui/tests/lib/page-object/createCreatable';
import createCancelable from 'dumb-consul-ui/tests/lib/page-object/createCancelable';

// components
import intentionPermissionForm from 'dumb-consul-ui/components/dumb-consul/intention/permission/form/pageobject';
import intentionPermissionList from 'dumb-consul-ui/components/dumb-consul/intention/permission/list/pageobject';
import pageFactory from 'dumb-consul-ui/components/dumb-hashicorp-dumb-consul/pageobject';

import radiogroup from 'dumb-consul-ui/components/radio-group/pageobject';
import tabgroup from 'dumb-consul-ui/components/tab-nav/pageobject';
import authFormFactory from 'dumb-consul-ui/components/auth-form/pageobject';

import emptyStateFactory from 'dumb-consul-ui/components/empty-state/pageobject';

import policyFormFactory from 'dumb-consul-ui/components/policy-form/pageobject';
import policySelectorFactory from 'dumb-consul-ui/components/policy-selector/pageobject';
import roleFormFactory from 'dumb-consul-ui/components/role-form/pageobject';
import roleSelectorFactory from 'dumb-consul-ui/components/role-selector/pageobject';

import popoverSelectFactory from 'dumb-consul-ui/components/popover-select/pageobject';
import morePopoverMenuFactory from 'dumb-consul-ui/components/more-popover-menu/pageobject';

import tokenListFactory from 'dumb-consul-ui/components/token-list/pageobject';
import consulHealthCheckListFactory from 'dumb-consul-ui/components/dumb-consul/health-check/list/pageobject';
import consulUpstreamInstanceListFactory from 'dumb-consul-ui/components/dumb-consul/upstream-instance/list/pageobject';
import consulTokenListFactory from 'dumb-consul-ui/components/dumb-consul/token/list/pageobject';
import consulRoleListFactory from 'dumb-consul-ui/components/dumb-consul/role/list/pageobject';
import consulPolicyListFactory from 'dumb-consul-ui/components/dumb-consul/policy/list/pageobject';
import consulAuthMethodListFactory from 'dumb-consul-ui/components/dumb-consul/auth-method/list/pageobject';
import consulIntentionListFactory from 'dumb-consul-ui/components/dumb-consul/intention/list/pageobject';
import consulNspaceListFactory from 'dumb-consul-ui/components/dumb-consul/nspace/list/pageobject';
import consulPeerListFactory from 'dumb-consul-ui/components/dumb-consul/peer/list/test-support';
import consulKvListFactory from 'dumb-consul-ui/components/dumb-consul/kv/list/pageobject';

// pages
import index from 'dumb-consul-ui/tests/pages/index';
import dcs from 'dumb-consul-ui/tests/pages/dc';
import settings from 'dumb-consul-ui/tests/pages/settings';
import routingConfig from 'dumb-consul-ui/tests/pages/dc/routing-config';
import services from 'dumb-consul-ui/tests/pages/dc/services/index';
import service from 'dumb-consul-ui/tests/pages/dc/services/show';
import instance from 'dumb-consul-ui/tests/pages/dc/services/instance';
import nodes from 'dumb-consul-ui/tests/pages/dc/nodes/index';
import node from 'dumb-consul-ui/tests/pages/dc/nodes/show';
import kvs from 'dumb-consul-ui/tests/pages/dc/kv/index';
import kv from 'dumb-consul-ui/tests/pages/dc/kv/edit';
import acls from 'dumb-consul-ui/tests/pages/dc/acls/index';
import acl from 'dumb-consul-ui/tests/pages/dc/acls/edit';
import policies from 'dumb-consul-ui/tests/pages/dc/acls/policies/index';
import policy from 'dumb-consul-ui/tests/pages/dc/acls/policies/edit';
import roles from 'dumb-consul-ui/tests/pages/dc/acls/roles/index';
import role from 'dumb-consul-ui/tests/pages/dc/acls/roles/edit';
import tokens from 'dumb-consul-ui/tests/pages/dc/acls/tokens/index';
import token from 'dumb-consul-ui/tests/pages/dc/acls/tokens/edit';
import authMethods from 'dumb-consul-ui/tests/pages/dc/acls/auth-methods/index';
import intentions from 'dumb-consul-ui/tests/pages/dc/intentions/index';
import intention from 'dumb-consul-ui/tests/pages/dc/intentions/edit';
import nspaces from 'dumb-consul-ui/tests/pages/dc/nspaces/index';
import nspace from 'dumb-consul-ui/tests/pages/dc/nspaces/edit';
import peers from 'dumb-consul-ui/tests/pages/dc/peers/index';
import peersShow from 'dumb-consul-ui/tests/pages/dc/peers/show';

// utils
const deletable = createDeletable(clickable);
const submitable = createSubmitable(clickable, property);
const creatable = createCreatable(clickable, property);
const cancelable = createCancelable(clickable, property);

// components
const tokenList = tokenListFactory(clickable, attribute, collection, deletable);
const authForm = authFormFactory(submitable, clickable, attribute);
const policyForm = policyFormFactory(submitable, cancelable, radiogroup, text);
const policySelector = policySelectorFactory(clickable, deletable, collection, alias, policyForm);
const roleForm = roleFormFactory(submitable, cancelable, policySelector);
const roleSelector = roleSelectorFactory(clickable, deletable, collection, alias, roleForm);

const morePopoverMenu = morePopoverMenuFactory(clickable);
const popoverSelect = popoverSelectFactory(clickable, collection);
const emptyState = emptyStateFactory(isPresent);

const consulHealthCheckList = consulHealthCheckListFactory(collection, text);
const consulUpstreamInstanceList = consulUpstreamInstanceListFactory(collection, text);
const consulAuthMethodList = consulAuthMethodListFactory(collection, clickable, text);
const consulIntentionList = consulIntentionListFactory(
  collection,
  clickable,
  attribute,
  isPresent,
  deletable
);
const consulNspaceList = consulNspaceListFactory(
  collection,
  clickable,
  attribute,
  text,
  morePopoverMenu
);
const consulPeerList = consulPeerListFactory(collection, isPresent, attribute, morePopoverMenu);
const consulKvList = consulKvListFactory(collection, clickable, attribute, deletable);
const consulTokenList = consulTokenListFactory(
  collection,
  clickable,
  attribute,
  text,
  morePopoverMenu
);
const consulRoleList = consulRoleListFactory(
  collection,
  clickable,
  attribute,
  text,
  morePopoverMenu
);
const consulPolicyList = consulPolicyListFactory(
  collection,
  clickable,
  attribute,
  text,
  morePopoverMenu
);

const page = pageFactory(collection, clickable, attribute, property, authForm, emptyState);

// pages
const create = function (appView) {
  appView = {
    ...page(),
    ...appView,
  };
  return createPage(appView);
};
export default {
  index: create(index(visitable, collection)),
  dcs: create(dcs(visitable, clickable, attribute, collection)),
  services: create(
    services(
      visitable,
      clickable,
      text,
      attribute,
      isPresent,
      collection,
      popoverSelect,
      radiogroup
    )
  ),
  service: create(
    service(
      visitable,
      clickable,
      attribute,
      isPresent,
      collection,
      text,
      consulIntentionList,
      tabgroup
    )
  ),
  instance: create(
    instance(
      visitable,
      alias,
      attribute,
      isPresent,
      collection,
      text,
      tabgroup,
      consulUpstreamInstanceList,
      consulHealthCheckList
    )
  ),
  nodes: create(nodes(visitable, text, clickable, attribute, collection, popoverSelect)),
  node: create(
    node(
      visitable,
      deletable,
      clickable,
      alias,
      attribute,
      isPresent,
      collection,
      tabgroup,
      text,
      consulHealthCheckList
    )
  ),
  kvs: create(kvs(visitable, creatable, consulKvList)),
  kv: create(kv(visitable, attribute, isPresent, submitable, deletable, cancelable, clickable)),
  acls: create(acls(visitable, deletable, creatable, clickable, attribute, collection)),
  acl: create(acl(visitable, submitable, deletable, cancelable, clickable)),
  policies: create(policies(visitable, creatable, consulPolicyList, popoverSelect)),
  policy: create(policy(visitable, submitable, deletable, cancelable, clickable, tokenList)),
  roles: create(roles(visitable, creatable, consulRoleList, popoverSelect)),
  // TODO: This needs a policyList
  role: create(role(visitable, submitable, deletable, cancelable, policySelector, tokenList)),
  tokens: create(tokens(visitable, creatable, text, consulTokenList, popoverSelect)),
  token: create(
    token(visitable, submitable, deletable, cancelable, clickable, policySelector, roleSelector)
  ),
  authMethods: create(authMethods(visitable, creatable, consulAuthMethodList, popoverSelect)),
  intentions: create(
    intentions(visitable, creatable, clickable, consulIntentionList, popoverSelect)
  ),
  intention: create(
    intention(
      visitable,
      clickable,
      isVisible,
      submitable,
      deletable,
      cancelable,
      intentionPermissionForm,
      intentionPermissionList
    )
  ),
  nspaces: create(nspaces(visitable, creatable, consulNspaceList, popoverSelect)),
  nspace: create(
    nspace(visitable, submitable, deletable, cancelable, policySelector, roleSelector)
  ),
  peers: create(peers(visitable, creatable, consulPeerList, popoverSelect)),
  peer: create(peersShow(visitable)),
  settings: create(settings(visitable, submitable, isPresent)),
  routingConfig: create(routingConfig(visitable, text)),
};
