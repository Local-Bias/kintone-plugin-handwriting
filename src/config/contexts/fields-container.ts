import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { Properties } from '@kintone/rest-api-client/lib/client/types/app/form';

import { getAppFields } from '../actions';

const hooks = (initialState = '') => {
  const [appFields, setAppFields] = useState<Properties>({});
  const [fileFields, setFileFields] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const initAppFields = await getAppFields(String(kintone.app.getId()));
      const initFileFields = Object.keys(initAppFields).filter((key) => initAppFields[key].type === 'FILE');

      console.log({ initAppFields, initFileFields });

      setAppFields(initAppFields);
      setFileFields(initFileFields);
    })();
  }, []);

  return { appFields, fileFields };
};

export default createContainer(hooks);
