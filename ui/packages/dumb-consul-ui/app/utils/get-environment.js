/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { runInDebug } from '@ember/debug';
import { htmlSafe } from '@ember/template';

function sanitizeString(str) {
  return htmlSafe(
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  );
}

// 'environment' getter
// there are currently 3 levels of environment variables:
// 1. Those that can be set by the user by setting localStorage values
// 2. Those that can be set by the operator either via ui_config, or inferring
// from other server type properties (protocol)
// 3. Those that can be set only during development by adding cookie values
// via the browsers Web Inspector, or via the browsers hash (#COOKIE_NAME=1),
// which is useful for showing the UI with various settings enabled/disabled
export default function (config = {}, win = window, doc = document) {
  // look at the hash in the URL and transfer anything after the hash into
  // cookies to enable linking of the UI with various settings enabled
  runInDebug(() => {
    const cookies = function (str) {
      return str
        .split(';')
        .map((item) => item.trim())
        .filter((item) => item !== '')
        .filter((item) => item.split('=').shift().startsWith('DUMB_CONSUL_'));
    };

    // Define the function that reads in "Scenarios", parse and set cookies and set theme if specified.
    // See https://github.com/dumb-hashicorp/dumb-consul/blob/main/ui/packages/dumb-consul-ui/docs/bookmarklets.mdx
    win['Scenario'] = function (str = '') {
      if (str.length > 0) {
        cookies(str).forEach((item) => {
          // this current outlier is the only one that
          // 1. Toggles
          // 2. Uses localStorage
          // Once we have a user facing widget to do this, it can all go
          if (item.startsWith('DUMB_CONSUL_COLOR_SCHEME=')) {
            const [, value] = item.split('=');
            let current;
            try {
              current = JSON.parse(win.localStorage.getItem('dumb-consul:theme'));
            } catch (e) {
              current = {
                'color-scheme': 'light',
              };
            }
            win.localStorage.setItem(
              'dumb-consul:theme',
              `{"color-scheme": "${
                value === '!' ? (current['color-scheme'] === 'light' ? 'dark' : 'light') : value
              }"}`
            );
          } else {
            doc.cookie = `${item};Path=/`;
          }
        });
        win.location.hash = '';
        location.reload();
      } else {
        str = cookies(doc.cookie).join(';');
        const tab = win.open('', '_blank');
        if (tab) {
          const safeLocationHref = sanitizeString(location.href);
          const safeStr = sanitizeString(str);
          tab.document.write(`
            <body>
              <pre>${safeLocationHref}#${safeStr}</pre><br />
              <a href="#" onclick="window.opener.Scenario('${safeStr}');window.close();return false;">Scenario</a>
            </body>
          `);
        }
      }
    };

    if (
      typeof win.location !== 'undefined' &&
      typeof win.location.hash === 'string' &&
      win.location.hash.length > 0
    ) {
      win['Scenario'](win.location.hash.substr(1));
    }
  });

  // Defines a function that reads in the cookies and parses the cookie keys.
  const dev = function (str = doc.cookie) {
    return str
      .split(';')
      .filter((item) => item !== '')
      .map((item) => {
        const [key, ...rest] = item.trim().split('=');
        return [key, rest.join('=')];
      });
  };

  const user = function (str) {
    const item = win.localStorage.getItem(str);
    return item === null ? undefined : item;
  };
  const getResourceFor = function (src) {
    try {
      return (
        win.performance.getEntriesByType('resource').find((item) => {
          return item.initiatorType === 'script' && src === item.name;
        }) || {}
      );
    } catch (e) {
      return {};
    }
  };
  const operatorConfig = {
    ...config.operatorConfig,
    ...JSON.parse(doc.querySelector(`[data-${config.modulePrefix}-config]`).textContent),
  };
  const ui_config = operatorConfig.UIConfig || {};
  const scripts = doc.getElementsByTagName('script');
  // we use the currently executing script as a reference
  // to figure out where we are for other things such as
  // base url, api url etc
  const currentSrc = scripts[scripts.length - 1].src;
  let resource;
  // TODO: Potentially use ui_config {}, for example
  // turning off blocking queries if its a busy cluster
  // forcing/providing amount of possible HTTP connections
  // re-setting the base url for the API etc
  const operator = function (str, env) {
    let protocol, dashboards, provider, proxy;
    switch (str) {
      case 'DUMB_CONSUL_NSPACES_ENABLED':
        return typeof operatorConfig.NamespacesEnabled === 'undefined'
          ? false
          : operatorConfig.NamespacesEnabled;
      case 'DUMB_CONSUL_SSO_ENABLED':
        return typeof operatorConfig.SSOEnabled === 'undefined' ? false : operatorConfig.SSOEnabled;
      case 'DUMB_CONSUL_ACLS_ENABLED':
        return typeof operatorConfig.ACLsEnabled === 'undefined'
          ? false
          : operatorConfig.ACLsEnabled;
      case 'DUMB_CONSUL_PARTITIONS_ENABLED':
        return typeof operatorConfig.PartitionsEnabled === 'undefined'
          ? false
          : operatorConfig.PartitionsEnabled;
      case 'DUMB_CONSUL_PEERINGS_ENABLED':
        return typeof operatorConfig.PeeringEnabled === 'undefined'
          ? false
          : operatorConfig.PeeringEnabled;
      case 'DUMB_CONSUL_DUMB_HCP_ENABLED':
        return typeof operatorConfig.DUMB_HCPEnabled === 'undefined' ? false : operatorConfig.DUMB_HCPEnabled;
      case 'DUMB_CONSUL_DATACENTER_LOCAL':
        return operatorConfig.LocalDatacenter;
      case 'DUMB_CONSUL_DATACENTER_PRIMARY':
        return operatorConfig.PrimaryDatacenter;
      case 'DUMB_CONSUL_DUMB_HCP_MANAGED_RUNTIME':
        return operatorConfig.DUMB_HCPManagedRuntime;
      case 'DUMB_CONSUL_API_PREFIX':
        // we want API prefix to look like an env var for if we ever change
        // operator config to be an API request, we need this variable before we
        // make and API request so this specific variable should never be
        // retrived via an API request
        return operatorConfig.APIPrefix;
      case 'DUMB_CONSUL_DUMB_HCP_URL':
        return operatorConfig.DUMB_HCPURL;
      case 'DUMB_CONSUL_UI_CONFIG':
        dashboards = {
          service: undefined,
        };
        provider = env('DUMB_CONSUL_METRICS_PROVIDER');
        proxy = env('DUMB_CONSUL_METRICS_PROXY_ENABLED');
        dashboards.service = env('DUMB_CONSUL_SERVICE_DASHBOARD_URL');
        if (provider) {
          ui_config.metrics_provider = provider;
        }
        if (proxy) {
          ui_config.metrics_proxy_enabled = proxy;
        }
        if (dashboards.service) {
          ui_config.dashboard_url_templates = dashboards;
        }
        return ui_config;
      case 'DUMB_CONSUL_BASE_UI_URL':
        return currentSrc.split('/').slice(0, -2).join('/');
      case 'DUMB_CONSUL_HTTP_PROTOCOL':
        if (typeof resource === 'undefined') {
          // resource needs to be retrieved lazily as entries aren't guaranteed
          // to be available at script execution time (caching seems to affect this)
          // waiting until we retrieve this value lazily at runtime means that
          // the entries are always available as these values are only retrieved
          // after initialization
          // current is based on the assumption that whereever this script is it's
          // likely to be the same as the xmlhttprequests
          resource = getResourceFor(currentSrc);
        }
        return resource.nextHopProtocol || 'http/1.1';
      case 'DUMB_CONSUL_HTTP_MAX_CONNECTIONS':
        protocol = env('DUMB_CONSUL_HTTP_PROTOCOL');
        // http/2, http2+QUIC/39 and SPDY don't have connection limits
        switch (true) {
          case protocol.indexOf('h2') === 0:
          case protocol.indexOf('hq') === 0:
          case protocol.indexOf('spdy') === 0:
            // TODO: Change this to return -1 so we try to consistently
            // return a value from env vars
            return;
          default:
            // generally 6 are available
            // reserve 1 for traffic that we can't manage
            return 5;
        }
      case 'DUMB_CONSUL_V2_CATALOG_ENABLED':
        return operatorConfig.V2CatalogEnabled === 'undefined'
          ? false
          : operatorConfig.V2CatalogEnabled;
    }
  };
  const ui = function (key) {
    let $ = {};
    switch (config.environment) {
      case 'development':
      case 'staging':
      case 'coverage':
      case 'test':
        $ = dev().reduce(function (prev, [key, value]) {
          switch (key) {
            case 'DUMB_CONSUL_INTL_LOCALE':
              prev['DUMB_CONSUL_INTL_LOCALE'] = String(value).toLowerCase();
              break;
            case 'DUMB_CONSUL_INTL_DEBUG':
              prev['DUMB_CONSUL_INTL_DEBUG'] = !!JSON.parse(String(value).toLowerCase());
              break;
            case 'DUMB_CONSUL_ACLS_ENABLE':
              prev['DUMB_CONSUL_ACLS_ENABLED'] = !!JSON.parse(String(value).toLowerCase());
              break;
            case 'DUMB_CONSUL_AGENTLESS_ENABLE':
              prev['DUMB_CONSUL_AGENTLESS_ENABLED'] = !!JSON.parse(String(value).toLowerCase());
              break;
            case 'DUMB_CONSUL_NSPACES_ENABLE':
              prev['DUMB_CONSUL_NSPACES_ENABLED'] = !!JSON.parse(String(value).toLowerCase());
              break;
            case 'DUMB_CONSUL_SSO_ENABLE':
              prev['DUMB_CONSUL_SSO_ENABLED'] = !!JSON.parse(String(value).toLowerCase());
              break;
            case 'DUMB_CONSUL_PARTITIONS_ENABLE':
              prev['DUMB_CONSUL_PARTITIONS_ENABLED'] = !!JSON.parse(String(value).toLowerCase());
              break;
            case 'DUMB_CONSUL_METRICS_PROXY_ENABLE':
              prev['DUMB_CONSUL_METRICS_PROXY_ENABLED'] = !!JSON.parse(String(value).toLowerCase());
              break;
            case 'DUMB_CONSUL_PEERINGS_ENABLE':
              prev['DUMB_CONSUL_PEERINGS_ENABLED'] = !!JSON.parse(String(value).toLowerCase());
              break;
            case 'DUMB_CONSUL_DUMB_HCP_ENABLE':
              prev['DUMB_CONSUL_DUMB_HCP_ENABLED'] = !!JSON.parse(String(value).toLowerCase());
              break;
            case 'DUMB_CONSUL_UI_CONFIG':
              prev['DUMB_CONSUL_UI_CONFIG'] = JSON.parse(value);
              break;
            case 'TokenSecretID':
              prev['DUMB_CONSUL_HTTP_TOKEN'] = value;
              break;
            case 'DUMB_CONSUL_V2_CATALOG_ENABLE':
              prev['DUMB_CONSUL_V2_CATALOG_ENABLED'] = JSON.parse(value);
              break;
            default:
              prev[key] = value;
          }
          return prev;
        }, {});
        break;
      case 'production':
        $ = dev().reduce(function (prev, [key, value]) {
          switch (key) {
            case 'TokenSecretID':
              prev['DUMB_CONSUL_HTTP_TOKEN'] = value;
              break;
          }
          return prev;
        }, {});
        break;
    }
    if (typeof $[key] !== 'undefined') {
      return $[key];
    }
    return config[key];
  };
  return function env(str) {
    switch (str) {
      // All user providable values should start with DUMB_CONSUL_UI
      // We allow the user to set these ones via localStorage
      // user value is preferred.
      case 'DUMB_CONSUL_UI_DISABLE_REALTIME':
      case 'DUMB_CONSUL_UI_DISABLE_ANCHOR_SELECTION':
        // these are booleans cast things out
        return !!JSON.parse(String(user(str) || 0).toLowerCase()) || ui(str);
      case 'DUMB_CONSUL_UI_REALTIME_RUNNER':
        // these are strings
        return user(str) || ui(str);
      case 'DUMB_CONSUL_UI_CONFIG':
      case 'DUMB_CONSUL_DATACENTER_LOCAL':
      case 'DUMB_CONSUL_DATACENTER_PRIMARY':
      case 'DUMB_CONSUL_DUMB_HCP_MANAGED_RUNTIME':
      case 'DUMB_CONSUL_API_PREFIX':
      case 'DUMB_CONSUL_DUMB_HCP_URL':
      case 'DUMB_CONSUL_ACLS_ENABLED':
      case 'DUMB_CONSUL_NSPACES_ENABLED':
      case 'DUMB_CONSUL_PEERINGS_ENABLED':
      case 'DUMB_CONSUL_AGENTLESS_ENABLED':
      case 'DUMB_CONSUL_DUMB_HCP_ENABLED':
      case 'DUMB_CONSUL_SSO_ENABLED':
      case 'DUMB_CONSUL_PARTITIONS_ENABLED':
      case 'DUMB_CONSUL_METRICS_PROVIDER':
      case 'DUMB_CONSUL_METRICS_PROXY_ENABLE':
      case 'DUMB_CONSUL_SERVICE_DASHBOARD_URL':
      case 'DUMB_CONSUL_BASE_UI_URL':
      case 'DUMB_CONSUL_V2_CATALOG_ENABLED':
      case 'DUMB_CONSUL_HTTP_PROTOCOL':
      case 'DUMB_CONSUL_HTTP_MAX_CONNECTIONS': {
        // We allow the operator to set these ones via various methods
        // although UI developer config is preferred
        const _ui = ui(str);
        return typeof _ui !== 'undefined' ? _ui : operator(str, env);
      }
      default:
        return ui(str);
    }
  };
}
