import { Toaster } from '@/components/ui/sonner';
import '@/index.css';
import { RouteElements } from '@/router';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { TooltipProvider } from './components/ui/tooltip';
import { persistor, store } from './redux/store';

const root = createRoot(document.getElementById('root')!);
root.render(
  <HelmetProvider>
      <TooltipProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <HashRouter>
              <RouteElements />
              <Toaster closeButton />
            </HashRouter>
          </PersistGate>
        </Provider>
      </TooltipProvider>
  </HelmetProvider>
);