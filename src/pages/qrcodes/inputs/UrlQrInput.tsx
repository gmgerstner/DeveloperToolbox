import { useState } from 'react';

import QrInputCard from './QrInputCard';
import type { QrInputProps } from './types';

export default function UrlQrInput({ onGenerate }: QrInputProps) {
  const [content, setContent] = useState('');

  return (
    <QrInputCard title="URL" onGenerate={() => onGenerate(content)}>
      <div className="row">
        <div className="col">
          <input
            className="form-control"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </QrInputCard>
  );
}
