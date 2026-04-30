/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import Service from '@ember/service';
import { andOr } from 'dumb-consul-ui/utils/filter';

import service from 'dumb-consul-ui/filter/predicates/service';
import serviceInstance from 'dumb-consul-ui/filter/predicates/service-instance';
import healthCheck from 'dumb-consul-ui/filter/predicates/health-check';
import node from 'dumb-consul-ui/filter/predicates/node';
import kv from 'dumb-consul-ui/filter/predicates/kv';
import intention from 'dumb-consul-ui/filter/predicates/intention';
import token from 'dumb-consul-ui/filter/predicates/token';
import policy from 'dumb-consul-ui/filter/predicates/policy';
import authMethod from 'dumb-consul-ui/filter/predicates/auth-method';
import peer from 'dumb-consul-ui/filter/predicates/peer';

const predicates = {
  service: andOr(service),
  ['service-instance']: andOr(serviceInstance),
  ['health-check']: andOr(healthCheck),
  ['auth-method']: andOr(authMethod),
  node: andOr(node),
  kv: andOr(kv),
  intention: andOr(intention),
  token: andOr(token),
  policy: andOr(policy),
  peer: andOr(peer),
};

export default class FilterService extends Service {
  predicate(type) {
    return predicates[type];
  }
}
