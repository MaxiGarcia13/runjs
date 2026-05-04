import { Editor } from '@/components/editor';
import { Preview } from '@/components/preview';
import { ResizablePanel } from '@/components/resizable-panel';
import { isMobile } from '@/utils/device';

export function App() {
  return (
    <ResizablePanel
      className="h-screen w-screen"
      direction={isMobile() ? 'vertical' : 'horizontal'}
      leftContent={<Editor className="p-2" />}
      rightContent={<Preview className="p-2" />}
    />
  );
}
