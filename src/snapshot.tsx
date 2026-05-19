import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyEditor } from '@/components/editor';
import '@/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LazyEditor />
  </StrictMode>,
);
