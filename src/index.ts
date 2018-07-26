/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/mockup-viewer/LICENSE
 */

import * as express    from 'express';
import * as path       from 'path';
import { application } from './core';
import { PORT }        from './registry/app';
import './services/open';

application.use('/assets', express.static(path.join(__dirname, 'assets')));

module.exports = application.listen(PORT, () => {
  console.log(`Mockup viewer running on port ${PORT}`);
});

application.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + '/index.html');
});
