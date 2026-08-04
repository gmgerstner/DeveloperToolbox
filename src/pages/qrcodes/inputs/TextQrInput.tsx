import { useState } from 'react';

import QrInputCard from './QrInputCard';
import type { QrInputProps } from './types';

export default function TextQrInput({ onGenerate }: QrInputProps) {
  const [content, setContent] = useState('');

  return (
    <QrInputCard title="Text" onGenerate={() => onGenerate(content)}>
      <div className="row">
        <div className="col">
          <textarea
            className="form-control"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </QrInputCard>
  );
}
