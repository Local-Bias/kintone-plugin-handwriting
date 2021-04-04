import React, { VFCX } from 'react';
import styled from '@emotion/styled';
import { CircularProgress, Backdrop, Button } from '@material-ui/core';

import { FieldsContainer, StorageContainer } from '../contexts';
import { ConditionAdditionButton, FormRow } from '.';

const Component: VFCX = ({ className }) => {
  const { appFields } = FieldsContainer.useContainer();
  const { storage } = StorageContainer.useContainer();

  return (
    <>
      <div className={className}>
        {storage.conditions.map((_, index) => (
          <FormRow key={index} index={index} />
        ))}
        <ConditionAdditionButton label='設定を追加する' />
      </div>
    </>
  );
};

const StyledComponent = styled(Component)``;

export default StyledComponent;
