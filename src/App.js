import React from 'react';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import People from './components/People';
import { Container } from "@material-ui/core"
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <People />
        </Container>
      </ToastProvider>
    </Provider>

  );
}

export default App;
