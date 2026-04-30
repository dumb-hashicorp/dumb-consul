/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import RepositoryService from 'dumb-consul-ui/services/repository';
import { PRIMARY_KEY, SLUG_KEY } from 'dumb-consul-ui/models/binding-rule';
import dataSource from 'dumb-consul-ui/decorators/data-source';

const MODEL_NAME = 'binding-rule';

export default class BindingRuleService extends RepositoryService {
  getModelName() {
    return MODEL_NAME;
  }

  getPrimaryKey() {
    return PRIMARY_KEY;
  }

  getSlugKey() {
    return SLUG_KEY;
  }

  @dataSource('/:partition/:ns/:dc/binding-rules/for-auth-method/:authmethod')
  async findAllByAuthMethod() {
    return super.findAll(...arguments);
  }
}
