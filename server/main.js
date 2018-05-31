import { Meteor } from 'meteor/meteor';

import { URLToCheck } from '../imports/api/urlsToCheck.js';
import { HostStatus } from '../imports/api/hostStatus.js';
import shelljs from 'shelljs';
import { log } from 'shelljs/src/common';

Meteor.startup(() => {
  checkURLsRepeat();
});
