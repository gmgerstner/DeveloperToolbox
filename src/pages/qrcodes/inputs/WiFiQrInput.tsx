import { useState } from 'react';

import QrInputCard from './QrInputCard';
import type { QrInputProps } from './types';
import './WiFiQrInput.css';

/*
    eg, 'WIFI:T:WPA;S:mynetwork;P:mypass;;'

      Parameter   Example    Description
      T           WPA        Authentication type; can be WEP or WPA or WPA2-EAP, or nopass for no password. Or, omit for no password.
      S           mynetwork  Network SSID. Required. Enclose in double quotes if it is an ASCII name, but could be interpreted as hex (i.e. "ABCD")
      P           mypass     Password, ignored if T is nopass (in which case it may be omitted). Enclose in double quotes if it is an ASCII name, but could be interpreted as hex (i.e. "ABCD")
      H           true       Optional. True if the network SSID is hidden. Note this was mistakenly also used to specify phase 2 method in releases up to 4.7.8 / Barcode Scanner 3.4.0. If not a boolean, it will be interpreted as phase 2 method (see below) for backwards-compatibility
      E           TTLS       (WPA2-EAP only) EAP method, like TTLS or PWD
      A           anon       (WPA2-EAP only) Anonymous identity
      I           myidentity (WPA2-EAP only) Identity
      PH2         MSCHAPV2   (WPA2-EAP only) Phase 2 method, like MSCHAPV2

    https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
*/
export default function WiFiQrInput({ onGenerate }: QrInputProps) {
  const [T, setT] = useState('nopass');
  const [S, setS] = useState('');
  const [H, setH] = useState(false);
  const [P, setP] = useState('');

  const content = `WIFI:T:${T};S:${S};H:${H};P:${P};`;

  return (
    <QrInputCard title="Wi-Fi Connection" className="wifi-qr" onGenerate={() => onGenerate(content)}>
      <div className="row">
        <div className="col">
          <label>Authentication</label>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <select className="form-select" value={T} onChange={(e) => setT(e.target.value)}>
            <option value="nopass">None</option>
            <option value="WEP">WEP</option>
            <option value="WPA">WPA / WPA2</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Network Name</label>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <input
            className="form-control"
            type="text"
            value={S}
            onChange={(e) => setS(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-check">
            <input
              type="checkbox"
              id="wifi-hidden"
              checked={H}
              onChange={(e) => setH(e.target.checked)}
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="wifi-hidden">Hidden</label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={P}
            onChange={(e) => setP(e.target.value)}
          />
        </div>
      </div>
    </QrInputCard>
  );
}
