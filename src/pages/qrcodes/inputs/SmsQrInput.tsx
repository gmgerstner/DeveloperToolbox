import { usePersistentState } from '../../../lib/persistent-state';
import QrInputCard from './QrInputCard';
import type { QrInputProps } from './types';

export default function SmsQrInput({ onGenerate }: QrInputProps) {
  const [phone, setPhone] = usePersistentState('qr.sms.phone', '');

  return (
    <QrInputCard title="Text to phone number" onGenerate={() => onGenerate(`sms:${phone}`)}>
      <div className="row">
        <div className="col">
          <input
            className="form-control"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
    </QrInputCard>
  );
}
