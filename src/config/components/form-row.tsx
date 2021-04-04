import React, { memo, VFCX, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { FieldsContainer, StorageContainer } from '../contexts';
import { ConditionDelitionButton } from '.';

type Props = {
  index: number;
};

const Component: VFCX<Props> = ({ className, index }) => {
  const { storage, update } = StorageContainer.useContainer();
  const { appFields, fileFields } = FieldsContainer.useContainer();

  const onChangeTarget = (event: ChangeEvent<HTMLInputElement>) => {
    update(index, { ...storage.conditions[index], fileField: event.target.value });
  };

  return (
    <div className={className}>
      <Accordion className='accordion' defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className='accordion-summary'>
          <Typography style={{ color: '#3f51b5', margin: '0 16px 0 0' }}>手書き設定{index + 1}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            select
            size='small'
            label='対象のファイルフィールド'
            value={storage.conditions[index].fileField}
            onChange={onChangeTarget}
            style={{ minWidth: '250px' }}
          >
            {fileFields.map((code) => (
              <MenuItem key={code} value={code}>
                {appFields[code].label}
              </MenuItem>
            ))}
          </TextField>
          <Divider orientation='vertical' flexItem style={{ margin: '0 16px' }} />
        </AccordionDetails>
      </Accordion>
      {storage.conditions.length > 1 && <ConditionDelitionButton index={index} />}
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  align-items: flex-start;

  .accordion {
    flex-grow: 1;
    box-shadow: none;
    border: 1px solid #ddd;
    margin-top: -1px;
  }
  .accordion-summary > div {
    display: flex;
    align-items: center;
  }
`;

export default StyledComponent;
