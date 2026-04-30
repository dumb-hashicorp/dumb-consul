/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import Route from 'dumb-consul-ui/routing/route';
import to from 'dumb-consul-ui/utils/routing/redirect-to';

export default class AuthMethodShowIndexRoute extends Route {
  redirect = to('auth-method');
}
