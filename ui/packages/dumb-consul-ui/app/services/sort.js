/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import Service from '@ember/service';
import service from 'dumb-consul-ui/sort/comparators/service';
import serviceInstance from 'dumb-consul-ui/sort/comparators/service-instance';
import upstreamInstance from 'dumb-consul-ui/sort/comparators/upstream-instance';
import kv from 'dumb-consul-ui/sort/comparators/kv';
import healthCheck from 'dumb-consul-ui/sort/comparators/health-check';
import intention from 'dumb-consul-ui/sort/comparators/intention';
import token from 'dumb-consul-ui/sort/comparators/token';
import role from 'dumb-consul-ui/sort/comparators/role';
import policy from 'dumb-consul-ui/sort/comparators/policy';
import authMethod from 'dumb-consul-ui/sort/comparators/auth-method';
import nspace from 'dumb-consul-ui/sort/comparators/nspace';
import peer from 'dumb-consul-ui/sort/comparators/peer';
import node from 'dumb-consul-ui/sort/comparators/node';

// returns an array of Property:asc, Property:desc etc etc
const directionify = (arr) => {
  return arr.reduce((prev, item) => prev.concat([`${item}:asc`, `${item}:desc`]), []);
};
// Specify a list of sortable properties, when called with a property
// returns an array ready to be passed to ember @sort
// properties(['Potential', 'Sortable', 'Properties'])('Sortable:asc') => ['Sortable:asc']
export const properties =
  (props = []) =>
  (key) => {
    const comparables = directionify(props);
    return [comparables.find((item) => item === key) || comparables[0]];
  };
const options = {
  properties,
  directionify,
};
const comparators = {
  service: service(options),
  ['service-instance']: serviceInstance(options),
  ['upstream-instance']: upstreamInstance(options),
  ['health-check']: healthCheck(options),
  ['auth-method']: authMethod(options),
  kv: kv(options),
  intention: intention(options),
  token: token(options),
  role: role(options),
  policy: policy(options),
  nspace: nspace(options),
  peer: peer(options),
  node: node(options),
};
export default class SortService extends Service {
  comparator(type) {
    return comparators[type];
  }
}
