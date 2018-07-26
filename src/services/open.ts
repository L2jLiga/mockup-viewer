/**
 * @license
 * Copyright Andrey Chalkin <L2jLiga>. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/mockup-viewer/LICENSE
 */

import * as child_process from 'child_process';
import * as express       from 'express';
import * as fileUpload    from 'express-fileupload';
import * as fs            from 'fs';
import * as path          from 'path';
import * as rimraf        from 'rimraf';
import { application }    from '../core';
import { tempFolder }     from '../registry/temp-folder';

application.use(fileUpload());

application.post('/open', async (req: express.Request, res: express.Response) => {
  const file: fileUpload.UploadedFile = req.files.mockup as fileUpload.UploadedFile;

  let tempFilePath = path.join(tempFolder.name, file.name);

  while (fs.existsSync(tempFilePath)) tempFilePath += '-1';

  file.mv(tempFilePath, (error) => {
    if (error) {
      console.error('An error occurred while moving uploaded file! Reason: %O', error);
    }
  });

  console.log(`Start converting of ${file.name}`);

  const forked = child_process.fork(path.join(__dirname, 'convert-file.js'), [tempFilePath]);

  forked.on('message', (mockups) => {
    console.log(`Finish converting of ${file.name}`);

    res.json(mockups);

    rimraf(tempFilePath, (error: Error) => {
      if (error) console.error('An error occurred while cleaning up temp directory! Reason: %O', error);
    });
  });
});
