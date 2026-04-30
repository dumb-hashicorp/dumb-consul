/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import validations from 'dumb-consul-ui/validations/token';
import builderFactory from 'dumb-consul-ui/utils/form/builder';
const builder = builderFactory();
export default function (container, name = '', v = validations, form = builder) {
  return form(name, {}).setValidators(v).add(container.form('policy')).add(container.form('role'));
}
