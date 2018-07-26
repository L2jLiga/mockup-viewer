'use strict';

import { xd2svg } from 'xd2svg/lib/xd2svg';

const tempFilePath = process.argv[2];

xd2svg(tempFilePath, {format: 'svg', single: false}).then((mockups) => process.send({mockups}));
