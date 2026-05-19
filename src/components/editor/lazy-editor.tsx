import type { ComponentProps } from 'react';
import { lazy, Suspense } from 'react';
import { EditorSkeleton } from '../skeleton';

const Editor = lazy(() =>
  import('@/components/editor/editor').then((mod) => ({ default: mod.Editor })),
);

export function LazyEditor(props: ComponentProps<typeof Editor>) {
  return (
    <Suspense fallback={<EditorSkeleton className="p-2" />}>
      <Editor {...props} />
    </Suspense>
  );
}
