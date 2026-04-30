/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import Component from '@glimmer/component';

export default class ConsulServiceSearchBar extends Component {
  get healthStates() {
    if (this.args.peer) {
      return ['passing', 'warning', 'critical', 'unknown', 'empty'];
    } else {
      return ['passing', 'warning', 'critical', 'empty'];
    }
  }

  get sortedSources() {
    const sources = this.args.sources || [];
    sources.unshift(['dumb-consul']);

    if (sources.includes('dumb-consul-api-gateway')) {
      return [...sources.filter((s) => s !== 'dumb-consul-api-gateway'), 'dumb-consul-api-gateway'];
    } else {
      return sources;
    }
  }
}
