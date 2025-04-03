
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ZoomProvider } from './components/layout/ZoomProvider.tsx'

createRoot(document.getElementById("root")!).render(
  <ZoomProvider>
    <App />
  </ZoomProvider>
);
