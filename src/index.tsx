
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConvexClientProvider } from './components/ConvexClientProvider';
import './index.css'; // Assuming index.css exists or will be created

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Could not find root element");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ConvexClientProvider>
      <App />
    </ConvexClientProvider>
  </React.StrictMode>
);
