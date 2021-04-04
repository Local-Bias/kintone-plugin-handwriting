import React, { VFCX } from 'react';
import { CanvasContainer, ColorPickerContainer } from './contexts';

import { Canvas, Toolbar } from './components';
import styled from '@emotion/styled';

const Component: VFCX<{ condition: PluginCondition }> = ({ className, condition }) => (
  <CanvasContainer.Provider initialState={condition.fileField}>
    <ColorPickerContainer.Provider>
      <div className={className}>
        <Canvas condition={condition} />
        <Toolbar />
      </div>
    </ColorPickerContainer.Provider>
  </CanvasContainer.Provider>
);

const StyledComponent = styled(Component)`
  min-width: ${({ condition }) => condition.size.width + 6}px;
`;

export default StyledComponent;
