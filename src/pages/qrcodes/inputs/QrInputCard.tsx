import type { ReactNode } from 'react';

interface QrInputCardProps {
  title: string;
  className?: string;
  children: ReactNode;
  onGenerate: () => void;
}

/**
 * The card shell every QR input shares, plus the Generate button. Replaces the
 * Angular `BaseQrInputComponent` that each input used to extend.
 */
export default function QrInputCard({ title, className, children, onGenerate }: QrInputCardProps) {
  return (
    <div className={className ? `card ${className}` : 'card'}>
      <div className="card-header">{title}</div>
      <div className="card-body">
        {children}
        <div className="row">
          <div className="col">
            <button type="button" className="mt-1 btn btn-primary" onClick={onGenerate}>
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
