import React, { VFCX } from 'react';
import styled from '@emotion/styled';
import { Button, ButtonProps } from '@material-ui/core';

const Component: VFCX<ButtonProps> = (props) => <Button variant='contained' color='primary' {...props} />;

const StyledComponent = styled(Component)`
  background-color: #3498db !important;
  &:hover {
    background-color: #1d6fa5 !important;
  }
`;

export default StyledComponent;
