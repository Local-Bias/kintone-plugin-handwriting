import React, { VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import { InputLabel, Slider } from '@material-ui/core';

import { StorageContainer } from '../contexts';

type Received = { index: number };

type Props = Received & {
  condition: kintone.plugin.Condition;
  update: (index: number, condition: kintone.plugin.Condition) => void;
};

const Component: VFCX<Props> = ({ className, index, condition, update }) => {
  const onChangeWidth: (event: React.ChangeEvent<{}>, value: number | number[]) => void = (_, value) => {
    const number = typeof value === 'number' ? value : value[0];

    update(index, { ...condition, size: { ...condition.size, width: number } });
  };
  const onChangeHeight: (event: React.ChangeEvent<{}>, value: number | number[]) => void = (_, value) => {
    const number = typeof value === 'number' ? value : value[0];

    update(index, { ...condition, size: { ...condition.size, height: number } });
  };

  return (
    <div className={className}>
      <div>
        <InputLabel>手書き領域の幅</InputLabel>
        <Slider value={condition.size.width} onChange={onChangeWidth} valueLabelDisplay='auto' min={1} max={1000} />
      </div>
      <div>
        <InputLabel>手書き領域の高さ</InputLabel>
        <Slider value={condition.size.height} onChange={onChangeHeight} valueLabelDisplay='auto' min={1} max={1000} />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: inline-block;
  width: 200px;
`;

const Container: VFC<Received> = ({ index }) => {
  const { storage, update } = StorageContainer.useContainer();

  return <StyledComponent index={index} condition={storage.conditions[index]} update={update} />;
};

export default Container;
