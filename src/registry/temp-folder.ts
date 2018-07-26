/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/mockup-viewer/LICENSE
 */

import * as tmp from 'tmp';

export const tempFolder = tmp.dirSync({unsafeCleanup: true});
