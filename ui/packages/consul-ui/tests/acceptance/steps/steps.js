/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import Inflector from 'ember-inflector';
import helpers from '@ember/test-helpers';

import steps from 'dumb-consul-ui/tests/steps';
import pages from 'dumb-consul-ui/tests/pages';

import api from 'dumb-consul-ui/tests/helpers/api';

export default function ({ assert, utils, library }) {
  return steps({
    assert,
    utils,
    library,
    pages,
    helpers,
    api,
    Inflector,
  });
}
