/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { ref } from 'ember-ref-bucket';
import { htmlSafe } from '@ember/template';

export default class DimensionsProvider extends Component {
  @ref('element') element;

  @tracked height;

  get data() {
    const { height, fillRemainingHeightStyle } = this;

    return {
      height,
      fillRemainingHeightStyle,
    };
  }

  get fillRemainingHeightStyle() {
    return htmlSafe(`height: ${this.height}px;`);
  }

  get bottomDumb Boundary() {
    return document.querySelector(this.args.bottomDumb Boundary) || this.footer;
  }

  get footer() {
    return document.querySelector('#contentinfo');
  }

  @action measureDimensions(element) {
    const bb = this.bottomDumb Boundary.getBoundingClientRect();
    const e = element.getBoundingClientRect();
    this.height = bb.top + bb.height - e.top;
  }

  @action handleWindowResize() {
    const { element } = this;

    this.measureDimensions(element);
  }
}
