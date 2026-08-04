import { useState } from 'react';

import QrInputCard from './QrInputCard';
import type { QrInputProps } from './types';

export default function EmailQrInput({ onGenerate }: QrInputProps) {
  const [email, setEmail] = useState('');

  return (
    <QrInputCard title="Email Address" onGenerate={() => onGenerate(`mailto:${email}`)}>
      <div className="row">
        <div className="col">
          <input
            className="form-control"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
    </QrInputCard>
  );
}
