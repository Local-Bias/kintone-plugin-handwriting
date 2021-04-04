import React, { VFC } from 'react';
import { SnackbarProvider } from 'notistack';

import { StorageContainer, FieldsContainer } from './contexts';
import { Footer, Form, SocialIcons } from './components';

const Component: VFC<{ pluginId: string }> = ({ pluginId }) => (
  <>
    <StorageContainer.Provider initialState={pluginId}>
      <SnackbarProvider maxSnack={3}>
        <FieldsContainer.Provider>
          <Form />
          <Footer />
        </FieldsContainer.Provider>
      </SnackbarProvider>
    </StorageContainer.Provider>
    <SocialIcons />
  </>
);

export default Component;
