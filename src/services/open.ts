/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/mockup-viewer/LICENSE
 */

import * as express    from 'express';
import * as fileUpload from 'express-fileupload';
import { unlinkSync }  from 'fs';
import { xd2svg }      from 'xd2svg/lib/xd2svg';
import { application } from '../core';

application.use(fileUpload());

application.post('/open', async (req: express.Request, res: express.Response) => {
  const file: fileUpload.UploadedFile = req.files.mockup as fileUpload.UploadedFile;

  const tmp = `${__dirname}/tmp-file.xd`;

  file.mv(tmp, (error) => {
    if (error) {
      console.error('An error occurred while moving uploaded file! Reason: %O', error);
    }
  });

  const mockups: string = await xd2svg(tmp, {format: 'svg', single: true}) as string;

  unlinkSync(tmp);

  res.json({mockups});
});
