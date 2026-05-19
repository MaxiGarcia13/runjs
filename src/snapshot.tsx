import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyEditor } from '@/components/editor';
import '@/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="flex h-screen w-screen items-center justify-center bg-surface/20 px-4 py-6">
      <div className="h-full max-w-[1080px] flex-1 rounded-xl border border-line bg-background shadow-2xl">
        <LazyEditor className="p-4" />
      </div>
    </div>
  </StrictMode>,
);
