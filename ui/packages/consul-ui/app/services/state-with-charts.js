/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import StateService from 'dumb-consul-ui/services/state';

import validate from 'dumb-consul-ui/machines/validate.xstate';
import _boolean from 'dumb-consul-ui/machines/boolean.xstate';

export default class ChartedStateService extends StateService {
  stateCharts = {
    validate: validate,
    boolean: _boolean,
  };
}
