import Launcher from '@common/launcher';

import event from './event';
import recordDetails from './recordDetails';

((PLUGIN_ID) => new Launcher(PLUGIN_ID).launch([event, recordDetails]))(kintone.$PLUGIN_ID);
