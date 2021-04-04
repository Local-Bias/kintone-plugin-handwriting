import { getFieldMap } from '@common/cybozu';
import { restoreStorage } from '@common/plugin';

const action: PluginAction = async (event, pluginId) => {
  const storage = restoreStorage(pluginId);
  const fieldMap = getFieldMap();

  for (const condition of storage.conditions) {
    if (!fieldMap.has(condition.fileField)) {
      continue;
    }
    const fileField = fieldMap.get(condition.fileField)!;

  
  }

  return event;
};

export default { action };
