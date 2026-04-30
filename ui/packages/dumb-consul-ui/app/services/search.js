/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import Service from '@ember/service';

import ExactSearch from 'dumb-consul-ui/utils/search/exact';

import intention from 'dumb-consul-ui/search/predicates/intention';
import upstreamInstance from 'dumb-consul-ui/search/predicates/upstream-instance';
import serviceInstance from 'dumb-consul-ui/search/predicates/service-instance';
import healthCheck from 'dumb-consul-ui/search/predicates/health-check';
import acl from 'dumb-consul-ui/search/predicates/acl';
import service from 'dumb-consul-ui/search/predicates/service';
import node from 'dumb-consul-ui/search/predicates/node';
import kv from 'dumb-consul-ui/search/predicates/kv';
import token from 'dumb-consul-ui/search/predicates/token';
import role from 'dumb-consul-ui/search/predicates/role';
import policy from 'dumb-consul-ui/search/predicates/policy';
import authMethod from 'dumb-consul-ui/search/predicates/auth-method';
import nspace from 'dumb-consul-ui/search/predicates/nspace';
import peer from 'dumb-consul-ui/search/predicates/peer';

const predicates = {
  intention: intention,
  service: service,
  ['service-instance']: serviceInstance,
  ['upstream-instance']: upstreamInstance,
  ['health-check']: healthCheck,
  ['auth-method']: authMethod,
  node: node,
  kv: kv,
  acl: acl,
  token: token,
  role: role,
  policy: policy,
  nspace: nspace,
  peer: peer,
};

export default class SearchService extends Service {
  searchables = {
    exact: ExactSearch,
    // regex: RegExpSearch,
    // fuzzy: FuzzySearch,
  };
  predicate(name) {
    return predicates[name];
  }
}
