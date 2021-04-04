import React, { Dispatch, memo, VFC } from 'react';
import styled from '@emotion/styled';

import { CanvasContainer } from '../contexts';
import { Action } from '../types/canvas';
import { Button } from '@material-ui/core';

import { ColorPicker, WidthSlider } from '.';
import { KintoneColorButton } from '@common/components';

type Props = {
  className?: string;
  dispatch: Dispatch<Action>;
};

const Component: VFC<Props> = memo(({ className, dispatch }) => {
  const onClickClear = () => dispatch({ type: 'clear' });
  const onClickDownload = () => dispatch({ type: 'download' });
  const onClickUpload = () => dispatch({ type: 'upload' });

  return (
    <div className={className}>
      <div>
        <Button variant='outlined' color='primary' onClick={onClickClear}>
          クリア
        </Button>
        <ColorPicker />
        <WidthSlider />
      </div>
      <div>
        <KintoneColorButton onClick={onClickUpload} style={{ minWidth: '100px' }}>
          保存
        </KintoneColorButton>
      </div>
    </div>
  );
});

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Container: VFC = () => {
  const { dispatch } = CanvasContainer.useContainer();

  return <StyledComponent dispatch={dispatch} />;
};

export default Container;
