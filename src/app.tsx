import { lazy, Suspense } from 'react';
import { Header } from '@/components/header';
import { Preview } from '@/components/preview';
import { ResizablePanel } from '@/components/resizable-panel';
import { EditorSkeleton } from '@/components/skeleton';
import { ToastProvider } from '@/components/toast';
import { isMobile } from '@/utils/device';
import { Footer } from './components/footer';

const LazyEditor = lazy(() =>
  import('@/components/editor').then((mod) => ({ default: mod.Editor })),
);

export function App() {
  return (
    <ToastProvider>
      <Header />
      <ResizablePanel
        className="mx-2 mb-2 min-h-0 flex-1 overflow-hidden rounded-md border border-gray-600 bg-gray-800"
        direction={isMobile() ? 'vertical' : 'horizontal'}
        leftContent={(
          <Suspense fallback={<EditorSkeleton className="p-2" />}>
            <LazyEditor className="py-2 pr-2" />
          </Suspense>
        )}
        rightContent={<Preview className="pt-4 pr-2 pb-2 pl-4" />}
      />
      <Footer />
    </ToastProvider>
  );
}
