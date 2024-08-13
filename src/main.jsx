import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx';
import { AuthProvider } from './Context/AuthProvider.jsx';
import { PageProvider } from './Context/PageProvider.jsx';
import { LangProvider } from './Context/LangProvider.jsx';
import Scrolltotop from './Components/Scrolltotop.jsx';
import { Provider } from 'react-redux';
import store from './Components/store.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap everything inside BrowserRouter */}
      <AuthProvider>
        <PageProvider>
          <LangProvider>
            <Scrolltotop /> {/* Ensure Scrolltotop is inside the providers */}
            <Provider store={store}>
            <App />
            </Provider>
          </LangProvider>
        </PageProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
