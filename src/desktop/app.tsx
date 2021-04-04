import React, { VFCX } from 'react';
import { CanvasContainer, ColorPickerContainer } from './contexts';

import { Canvas, Toolbar } from './components';
import styled from '@emotion/styled';

const Component: VFCX<{ fieldCode: string }> = ({ className, fieldCode }) => (
  <CanvasContainer.Provider initialState={fieldCode}>
    <ColorPickerContainer.Provider>
      <div className={className}>
        <Canvas />
        <Toolbar />
      </div>
    </ColorPickerContainer.Provider>
  </CanvasContainer.Provider>
);

const StyledComponent = styled(Component)`
  min-width: 806px;
`;

export default StyledComponent;
