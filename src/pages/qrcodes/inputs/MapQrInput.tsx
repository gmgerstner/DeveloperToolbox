import { useState } from 'react';

import type { QrInputProps } from './types';

export default function MapQrInput({ onGenerate }: QrInputProps) {
  const [latitude, setLatitude] = useState('0');
  const [latitudeSign, setLatitudeSign] = useState('N');
  const [longitude, setLongitude] = useState('0');
  const [longitudeSign, setLongitudeSign] = useState('W');

  const content = `geo:${latitudeSign === 'S' ? '-' : ''}${latitude},${longitudeSign === 'W' ? '-' : ''}${longitude},0`;

  return (
    <div className="container px-5 my-5">
      <div id="contactForm">
        <div className="mb-3">
          <label className="form-label" htmlFor="latitude">Latitude</label>

          <div className="row">
            <div className="col-9">
              <input
                className="form-control"
                id="latitude"
                type="number"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="col-3">
              <select
                className="form-select"
                id="latitudeSign"
                aria-label="LatitudeSign"
                value={latitudeSign}
                onChange={(e) => setLatitudeSign(e.target.value)}
              >
                <option value="N">N</option>
                <option value="S">S</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="longitude">Longitude</label>

          <div className="row">
            <div className="col-9">
              <input
                className="form-control"
                id="longitude"
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
            <div className="col-3">
              <select
                className="form-select"
                id="longitudeSign"
                aria-label="LongitudeSign"
                value={longitudeSign}
                onChange={(e) => setLongitudeSign(e.target.value)}
              >
                <option value="W">W</option>
                <option value="E">E</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button
              type="button"
              className="mt-1 btn btn-success"
              onClick={() => onGenerate(content)}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
