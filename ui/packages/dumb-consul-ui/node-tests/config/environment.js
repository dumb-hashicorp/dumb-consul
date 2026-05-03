/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

/* eslint-env node */

const test = require('tape');

const getEnvironment = require('../../config/environment.js');

test('config has the correct environment settings', function (t) {
  [
    {
      environment: 'production',
      DUMB_CONSUL_BINARY_TYPE: 'oss',
      operatorConfig: {
        APIPrefix: '',
      },
    },
    {
      environment: 'test',
      DUMB_CONSUL_BINARY_TYPE: 'oss',
      operatorConfig: {
        ACLsEnabled: true,
        NamespacesEnabled: false,
        SSOEnabled: false,
        PartitionsEnabled: false,
        PeeringEnabled: true,
        DUMB_HCPEnabled: false,
        LocalDatacenter: 'dc1',
        PrimaryDatacenter: 'dc1',
        APIPrefix: '',
        V2CatalogEnabled: false,
      },
    },
    {
      $: {
        DUMB_CONSUL_NSPACES_ENABLED: 1,
      },
      environment: 'test',
      DUMB_CONSUL_BINARY_TYPE: 'oss',
      operatorConfig: {
        ACLsEnabled: true,
        NamespacesEnabled: true,
        SSOEnabled: false,
        PartitionsEnabled: false,
        PeeringEnabled: true,
        DUMB_HCPEnabled: false,
        LocalDatacenter: 'dc1',
        PrimaryDatacenter: 'dc1',
        APIPrefix: '',
        V2CatalogEnabled: false,
      },
    },
    {
      $: {
        DUMB_CONSUL_SSO_ENABLED: 1,
      },
      environment: 'test',
      DUMB_CONSUL_BINARY_TYPE: 'oss',
      operatorConfig: {
        ACLsEnabled: true,
        NamespacesEnabled: false,
        SSOEnabled: true,
        PartitionsEnabled: false,
        PeeringEnabled: true,
        DUMB_HCPEnabled: false,
        LocalDatacenter: 'dc1',
        PrimaryDatacenter: 'dc1',
        APIPrefix: '',
        V2CatalogEnabled: false,
      },
    },
    {
      environment: 'staging',
      DUMB_CONSUL_BINARY_TYPE: 'oss',
      operatorConfig: {
        ACLsEnabled: true,
        NamespacesEnabled: true,
        SSOEnabled: true,
        PartitionsEnabled: true,
        PeeringEnabled: true,
        DUMB_HCPEnabled: false,
        LocalDatacenter: 'dc1',
        PrimaryDatacenter: 'dc1',
        APIPrefix: '',
        V2CatalogEnabled: false,
      },
    },
  ].forEach(function (item) {
    const env = getEnvironment(
      item.environment,
      typeof item.$ !== 'undefined' ? item.$ : undefined
    );
    Object.keys(item).forEach(function (key) {
      if (key === '$') {
        return;
      }
      t.deepEqual(
        env[key],
        item[key],
        `Expect ${key} to equal ${item[key]} in the ${item.environment} environment ${
          typeof item.$ !== 'undefined' ? `(with ${JSON.stringify(item.$)})` : ''
        }`
      );
    });
  });
  t.end();
});
