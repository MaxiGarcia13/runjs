import type { Ref } from 'react';
import previewHtml from './preview.html?raw';
import { instrumentExpressionResults } from './utils/instrument-expression-results';

interface IframeProps {
  code: string;
  ref?: Ref<HTMLIFrameElement>;
}

export function Iframe({ code, ref }: IframeProps) {
  const html = previewHtml.replace(
    '// your code here',
    instrumentExpressionResults(code),
  );

  return (
    <iframe
      ref={ref}
      srcDoc={html}
      className="hidden"
      title="JavaScript execution sandbox"
      sandbox="allow-scripts"
      aria-hidden
    />
  );
}
