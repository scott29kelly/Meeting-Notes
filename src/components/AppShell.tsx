import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-[1320px]">{children}</div>
    </div>
  );
}
