import previewHtml from './preview.html?raw';

export function Iframe({ code }: { code: string }) {
  const html = previewHtml.replace('// your code here', code);

  return (
    <iframe
      srcDoc={html}
      className="hidden"
      title="JavaScript execution sandbox"
      sandbox="allow-scripts"
      aria-hidden
    />
  );
}
