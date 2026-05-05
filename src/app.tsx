import { lazy, Suspense } from 'react';
import { Header } from '@/components/header';
import { Preview } from '@/components/preview';
import { ResizablePanel } from '@/components/resizable-panel';
import { EditorSkeleton } from '@/components/skeleton';
import { ToastProvider } from '@/components/toast';
import { isMobile } from '@/utils/device';
import { Footer } from './components/footer';

const LazyEditor = lazy(() =>
  import('@/components/editor/editor').then((mod) => ({ default: mod.Editor })),
);

export function App() {
  return (
    <ToastProvider>
      <Header />
      <ResizablePanel
        className="flex-1 min-h-0 overflow-hidden bg-gray-800 rounded-md mx-2 mb-2 border border-gray-700"
        direction={isMobile() ? 'vertical' : 'horizontal'}
        leftContent={(
          <Suspense fallback={<EditorSkeleton className="p-2" />}>
            <LazyEditor className="p-2" />
          </Suspense>
        )}
        rightContent={<Preview className="p-2" />}
      />
      <Footer />
    </ToastProvider>
  );
}
