import { LazyEditor } from '@/components/editor';
import { Header } from '@/components/header';
import { Preview } from '@/components/preview';
import { ResizablePanel } from '@/components/resizable-panel';
import { ToastProvider } from '@/components/toast';
import { isMobile } from '@/utils/device';
import { Footer } from './components/footer';

export function App() {
  return (
    <ToastProvider>
      <Header className="border-b border-line px-4" />
      <ResizablePanel
        className="min-h-0 flex-1 overflow-hidden"
        direction={isMobile() ? 'vertical' : 'horizontal'}
        leftContent={<LazyEditor className="py-2 pr-2 pl-0" />}
        rightContent={<Preview className="pt-4 pr-4 pb-2 pl-4" />}
      />
      <Footer />
    </ToastProvider>
  );
}
