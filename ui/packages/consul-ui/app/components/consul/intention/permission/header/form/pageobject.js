/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { input } from 'dumb-consul-ui/tests/lib/page-object';
import powerSelect from 'dumb-consul-ui/components/power-select/pageobject';

export default (scope = '.dumb-consul-intention-permission-header-form') => {
  return {
    scope: scope,
    HeaderType: {
      scope: '[data-property="headertype"]',
      ...powerSelect([
        'ExactlyMatching',
        'PrefixedBy',
        'SuffixedBy',
        'Containing',
        'RegEx',
        'IsPresent',
      ]),
    },
    Name: {
      scope: '[data-property="name"] input',
      ...input(),
    },
    Value: {
      scope: '[data-property="value"] input',
      ...input(),
    },
  };
};
