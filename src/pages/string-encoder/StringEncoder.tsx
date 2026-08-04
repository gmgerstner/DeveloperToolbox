import { useRef, useState } from 'react';

import { copyToClipboard, download, readUploadedFile } from '../../lib/browser-io';
import { Base32Encoder } from './encoders/base32-encoder';
import { Base64Encoder } from './encoders/base64-encoder';
import { HtmlEncoder } from './encoders/html-encoder';
import { LineSorter } from './encoders/line-sorter';
import { SHA512Encoder } from './encoders/sha512-encoder';
import { UrlEncoder } from './encoders/url-encoder';

function transform(currentAlg: string, input: string): string {
  switch (currentAlg) {
    case 'HTML Encode':
      return new HtmlEncoder().encode(input);
    case 'HTML Decode':
      return new HtmlEncoder().decode(input);
    case 'Base32 Encode':
      return new Base32Encoder().encode(input);
    case 'Base32 Decode':
      return new Base32Encoder().decode(input);
    case 'Base64 Encode':
      return new Base64Encoder().encode(input);
    case 'Base64 Decode':
      return new Base64Encoder().decode(input);
    case 'URL Encode':
      return new UrlEncoder().encode(input);
    case 'URL Decode':
      return new UrlEncoder().decode(input);
    case 'Sort Lines':
      return new LineSorter().sort(input);
    case 'SHA512 Hash':
      return new SHA512Encoder().encode(input);
    default:
      return 'Unknown or unsuported selection: ' + currentAlg;
  }
}

export default function StringEncoder() {
  const [input, setInput] = useState('');
  const [currentAlg, setCurrentAlg] = useState('Sort Lines');
  const selectFile = useRef<HTMLInputElement>(null);

  const output = transform(currentAlg, input);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>String Encode/Decode</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Action</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <select
              className="form-select"
              value={currentAlg}
              onChange={(e) => setCurrentAlg(e.target.value)}
            >
              {/* Hash options are still to be implemented:
                  SHA-1, SHA-2, SHA224, SHA256, SHA384, SHA512, SHA512/224,
                  SHA512/256, SHA3-224, SHA3-256, SHA3-384, SHA3-512, CRC-16,
                  CRC-32 */}

              <optgroup label="HTML">
                <option>HTML Encode</option>
                <option>HTML Decode</option>
              </optgroup>

              {/* Base32 is not implemented yet:
                  <optgroup label="Base32">
                    <option>Base32 Encode</option>
                    <option>Base32 Decode</option>
                  </optgroup> */}

              <optgroup label="Base64">
                <option>Base64 Encode</option>
                <option>Base64 Decode</option>
              </optgroup>

              <optgroup label="URL">
                <option>URL Encode</option>
                <option>URL Decode</option>
              </optgroup>

              <optgroup label="Other">
                <option>Sort Lines</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Input String</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <textarea
              className="form-control"
              rows={10}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-auto text-right">
            <button
              className="btn btn-primary ms-1 mt-1"
              type="button"
              onClick={() => selectFile.current?.click()}
            >
              Load File
            </button>
            <button className="btn btn-primary ms-1 mt-1" type="button" onClick={() => setInput('')}>
              Clear
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Output Code</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <textarea className="form-control" rows={10} readOnly value={output} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary me-1 mt-1" onClick={() => download('file.txt', output)}>
              Save File
            </button>
          </div>
          <div className="col-auto text-right">
            <button
              className="btn btn-primary ms-1 mt-1 float-right"
              type="button"
              onClick={() => copyToClipboard(output, 'Output copied to clipboard')}
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      <input
        style={{ display: 'none' }}
        type="file"
        ref={selectFile}
        onChange={(e) => readUploadedFile(e, setInput)}
      />
    </>
  );
}
