/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { clickable } from 'ember-cli-page-object';
import { input, options, click, button } from 'dumb-consul-ui/tests/lib/page-object';
import powerSelect from 'dumb-consul-ui/components/power-select/pageobject';
import headersForm from 'dumb-consul-ui/components/dumb-consul/intention/permission/header/form/pageobject';
import headersList from 'dumb-consul-ui/components/dumb-consul/intention/permission/header/list/pageobject';

export default (scope = '.dumb-consul-intention-permission-form') => {
  return {
    scope: scope,
    resetScope: true, // where we use the form it is in a modal layer
    submit: {
      resetScope: true,
      scope: '.dumb-consul-intention-permission-modal [data-test-intention-permission-submit]',
      click: clickable(),
    },
    Action: {
      scope: '[data-property="action"]',
      ...options(['Allow', 'Deny']),
    },
    PathType: {
      scope: '[data-property="pathtype"]',
      ...powerSelect(['NoPath', 'PrefixedBy', 'Exact', 'RegEx']),
    },
    Path: {
      scope: '[data-property="path"] input',
      ...input(),
    },
    AllMethods: {
      scope: '[data-property="allmethods"]',
      ...click(),
    },
    Headers: {
      form: {
        ...headersForm(),
        submit: {
          resetScope: true,
          scope: '[data-test-add-header]',
          ...button(),
        },
      },
      list: {
        ...headersList(),
      },
    },
  };
};
