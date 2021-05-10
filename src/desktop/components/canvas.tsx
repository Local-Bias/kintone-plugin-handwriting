import React, { Dispatch, memo, useEffect, VFC } from 'react';
import styled from '@emotion/styled';
import { fabric } from 'fabric';

import { CanvasContainer } from '../contexts';
import { Action } from '../types/canvas';

const CANVAS_ID = 'canvas';

type Received = { condition: kintone.plugin.Condition };

type Props = Received & {
  className?: string;
  dispatch: Dispatch<Action>;
};

const Component: VFC<Props> = memo(({ className, dispatch, condition }) => {
  useEffect(() => {
    const initCanvas = new fabric.Canvas(CANVAS_ID, {
      isDrawingMode: true,
      width: condition.size.width,
      height: condition.size.height,
    });
    dispatch({ type: 'init', canvas: initCanvas });
  }, []);

  return (
    <div className={className}>
      <canvas id={CANVAS_ID} />
    </div>
  );
});

const StyledComponent = styled(Component)`
  border: 3px double #aaa;
`;

const Container: VFC<Received> = ({ condition }) => {
  const { dispatch } = CanvasContainer.useContainer();

  return <StyledComponent condition={condition} dispatch={dispatch} />;
};

export default Container;
