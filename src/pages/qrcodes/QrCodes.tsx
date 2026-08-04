import { useRef, useState } from 'react';
import QRCode from 'qrcode';

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
  const [type, setType] = useState('text');
  const canvas = useRef<HTMLCanvasElement>(null);

  const drawCanvas = (text: string) => {
    if (!canvas.current) {
      return;
    }

    QRCode.toCanvas(canvas.current, text, { width: 350 }, (error) => {
      if (error) console.error(error);
      console.log('success!');
    });
  };

  return (
    <div className="container qr-codes">
      <div className="row">
        <div className="col">
          <h1>QR Codes</h1>
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
              {type === 'text' && <TextQrInput onGenerate={drawCanvas} />}
              {type === 'url' && <UrlQrInput onGenerate={drawCanvas} />}
              {type === 'email' && <EmailQrInput onGenerate={drawCanvas} />}
              {type === 'phone' && <PhoneQrInput onGenerate={drawCanvas} />}
              {type === 'contactinfo' && <ContactInfoQrInput onGenerate={drawCanvas} />}
              {type === 'sms' && <SmsQrInput onGenerate={drawCanvas} />}
              {type === 'map' && <MapQrInput onGenerate={drawCanvas} />}
              {/* Calendar is still unfinished, so picking it renders nothing -
                  same as in the Angular app:
                  {type === 'calendar' && <CalendarQrInput onGenerate={drawCanvas} />} */}
              {type === 'wifi' && <WiFiQrInput onGenerate={drawCanvas} />}
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
