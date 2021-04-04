import React from 'react';
import { render } from 'react-dom';
import { getFieldMap } from '@common/cybozu';
import { restoreStorage } from '@common/plugin';

import App from './app';

const ROOT_ID = 'ribbit_canvas';

const events: EventType[] = ['app.record.detail.show'];

const enables: Enables = () => !document.getElementById(ROOT_ID);

const action: PluginAction = async (event, pluginId) => {
  const storage = restoreStorage(pluginId);
  const fieldMap = getFieldMap();

  for (const condition of storage.conditions) {
    if (!fieldMap.has(condition.fileField)) {
      continue;
    }
    const fileField = fieldMap.get(condition.fileField)!;

    const targetDOM = document.querySelector(`.field-${fileField.id}`);
    const span = document.createElement('span');
    span.id = ROOT_ID;
    targetDOM?.append(span);

    render(<App condition={condition} />, span);
  }

  return event;
};

export default { events, enables, action };
