import { useEffect, useState } from 'react';
import previewHtml from '@/assets/preview.html?raw';
import { useEditorStore } from '@/store/useEditorStore';
import { cn } from '@/utils/classes';

interface PreviewProps {
  className?: string;
}

export function Preview({ className }: PreviewProps) {
  const { code } = useEditorStore();

  const [output, setOutput] = useState<string[]>([]);

  const html = () => {
    return previewHtml.replace('// your code here', code);
  };

  useEffect(() => {
    setOutput([]);

    const onMessage = (event: MessageEvent) => {
      const data = event.data as {
        source?: string;
        payload?: string;
      };

      if (data.source !== 'runjs-preview')
        return;

      setOutput(prev => [...prev, data.payload]);
    };

    window.removeEventListener('message', onMessage);
    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, [code]);

  return (
    <div className={cn('h-full overflow-auto', className)}>
      <iframe
        srcDoc={html()}
        className="hidden"
        title="preview-runtime"
        sandbox="allow-scripts"
      />

      <pre className="h-full w-full p-3">
        {output.length > 0 ? output.join('\n') : 'Run console.log(...) to see output here.'}
      </pre>
    </div>
  );
}
