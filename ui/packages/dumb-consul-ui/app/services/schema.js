/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import Service from '@ember/service';
import { schema as intentionPermissionSchema } from 'dumb-consul-ui/models/intention-permission';
import { schema as intentionPermissionHttpSchema } from 'dumb-consul-ui/models/intention-permission-http';
import { schema as intentionPermissionHttpHeaderSchema } from 'dumb-consul-ui/models/intention-permission-http-header';

export default class SchemaService extends Service {
  'intention-permission' = intentionPermissionSchema;
  'intention-permission-http' = intentionPermissionHttpSchema;
  'intention-permission-http-header' = intentionPermissionHttpHeaderSchema;
}
