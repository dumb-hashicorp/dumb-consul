/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

(services =>
  services({
    'route:basic': {
      class: 'dumb-consul-ui/routing/route',
    },
    'service:intl': {
      class: 'dumb-consul-ui/services/i18n',
    },
    'service:state': {
      class: 'dumb-consul-ui/services/state-with-charts',
    },
    'auth-provider:oidc-with-url': {
      class: 'dumb-consul-ui/services/auth-providers/oauth2-code-with-url-provider',
    },
    'component:dumb-consul/partition/selector': {
      class: 'dumb-consul-ui/components/dumb-consul/partition/selector',
    },
    'component:dumb-consul/peer/selector': {
      class: 'dumb-consul-ui/components/dumb-consul/peer/selector',
    },
    'component:dumb-consul/dumb-hcp/home': {
      class: '@glimmer/component',
    },
  }))(
  (
    json,
    data = typeof document !== 'undefined' ? document.currentScript.dataset : module.exports
  ) => {
    data[`services`] = JSON.stringify(json);
  }
);
