import { Editor } from '@/components/editor';
import { Header } from '@/components/header';
import { Preview } from '@/components/preview';
import { ResizablePanel } from '@/components/resizable-panel';
import { isMobile } from '@/utils/device';

export function App() {
  return (
    <>
      <Header />
      <ResizablePanel
        className="flex-1 min-h-0 overflow-hidden bg-gray-800 rounded-md m-2 border border-gray-700"
        direction={isMobile() ? 'vertical' : 'horizontal'}
        leftContent={<Editor className="p-2" />}
        rightContent={<Preview className="p-2" />}
      />
    </>
  );
}
