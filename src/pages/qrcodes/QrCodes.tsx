import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

import { clearPersistentState, usePersistentState } from '../../lib/persistent-state';
import ContactInfoQrInput from './inputs/ContactInfoQrInput';
import EmailQrInput from './inputs/EmailQrInput';
import MapQrInput from './inputs/MapQrInput';
import PhoneQrInput from './inputs/PhoneQrInput';
import SmsQrInput from './inputs/SmsQrInput';
import TextQrInput from './inputs/TextQrInput';
import UrlQrInput from './inputs/UrlQrInput';
import WiFiQrInput from './inputs/WiFiQrInput';
import './QrCodes.css';

// https://github.com/zxing/zxing/wiki/Barcode-Contents

export default function QrCodes() {
  // Bumped on reset so every input remounts and re-reads its (now cleared) state.
  const [resetKey, setResetKey] = useState(0);

  const reset = () => {
    clearPersistentState('qr.');
    setResetKey((k) => k + 1);
  };

  return <QrCodesContent key={resetKey} onReset={reset} />;
}

function QrCodesContent({ onReset }: { onReset: () => void }) {
  const [type, setType] = usePersistentState('qr.type', 'text');
  // The text of the last generated code, so the image is redrawn when the user
  // comes back to this page.
  const [qrText, setQrText] = usePersistentState<string | null>('qr.generatedText', null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current || qrText === null) {
      return;
    }

    QRCode.toCanvas(canvas.current, qrText, { width: 350 }, (error) => {
      if (error) console.error(error);
    });
  }, [qrText]);

  return (
    <div className="container qr-codes">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h1>QR Codes</h1>
            <button type="button" className="btn btn-secondary" onClick={onReset}>
              Reset
            </button>
          </div>
          <div className="row">
            <div className="col">
              <label>Type</label>
              <select
                className="form-select mb-2"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="text">Basic Text</option>
                <option value="url">URL Link</option>
                <option value="email">Email</option>
                <option value="phone">Phone Number</option>
                <option value="contactinfo">Contact Info</option>
                <option value="sms">SMS</option>
                <option value="map">Map</option>
                <option value="calendar">Calendar</option>
                <option value="wifi">WiFi Connection</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col mb-2">
              {type === 'text' && <TextQrInput onGenerate={setQrText} />}
              {type === 'url' && <UrlQrInput onGenerate={setQrText} />}
              {type === 'email' && <EmailQrInput onGenerate={setQrText} />}
              {type === 'phone' && <PhoneQrInput onGenerate={setQrText} />}
              {type === 'contactinfo' && <ContactInfoQrInput onGenerate={setQrText} />}
              {type === 'sms' && <SmsQrInput onGenerate={setQrText} />}
              {type === 'map' && <MapQrInput onGenerate={setQrText} />}
              {/* Calendar is still unfinished, so picking it renders nothing -
                  same as in the Angular app:
                  {type === 'calendar' && <CalendarQrInput onGenerate={setQrText} />} */}
              {type === 'wifi' && <WiFiQrInput onGenerate={setQrText} />}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <label>Image</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <canvas id="canvas" ref={canvas}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
