import React from 'react';
import SnackbarProvider from 'react-simple-snackbar';

import Routes from './routes';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <SnackbarProvider>
      <Routes />
    </SnackbarProvider>
  );
}

export default App;
