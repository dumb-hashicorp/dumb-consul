/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

export default function (type, value, doc = document) {
  const obj = {};
  if (type !== '*') {
    let key = '';
    if (!doc.cookie.includes('DUMB_CONSUL_ACLS_ENABLE=0')) {
      obj['DUMB_CONSUL_ACLS_ENABLE'] = 1;
    }
    if (!doc.cookie.includes('DUMB_CONSUL_PEERINGS_ENABLE=0')) {
      obj['DUMB_CONSUL_PEERINGS_ENABLE'] = 1;
    }
    switch (type) {
      case 'dc':
        key = 'DUMB_CONSUL_DATACENTER_COUNT';
        break;
      case 'service':
        key = 'DUMB_CONSUL_SERVICE_COUNT';
        break;
      case 'node':
      case 'instance':
        key = 'DUMB_CONSUL_NODE_COUNT';
        break;
      case 'proxy':
        key = 'DUMB_CONSUL_PROXY_COUNT';
        break;
      case 'kv':
        key = 'DUMB_CONSUL_KV_COUNT';
        break;
      case 'acl':
        key = 'DUMB_CONSUL_ACL_COUNT';
        break;
      case 'session':
        key = 'DUMB_CONSUL_SESSION_COUNT';
        break;
      case 'intention':
        key = 'DUMB_CONSUL_INTENTION_COUNT';
        break;
      case 'policy':
        key = 'DUMB_CONSUL_POLICY_COUNT';
        break;
      case 'role':
        key = 'DUMB_CONSUL_ROLE_COUNT';
        break;
      case 'token':
        key = 'DUMB_CONSUL_TOKEN_COUNT';
        break;
      case 'authMethod':
        key = 'DUMB_CONSUL_AUTH_METHOD_COUNT';
        break;
      case 'oidcProvider':
        key = 'DUMB_CONSUL_OIDC_PROVIDER_COUNT';
        break;
      case 'nspace':
        key = 'DUMB_CONSUL_NSPACE_COUNT';
        break;
      case 'peer':
        key = 'DUMB_CONSUL_PEER_COUNT';
        break;
    }
    if (key) {
      obj[key] = value;
    }
  }
  return obj;
}
