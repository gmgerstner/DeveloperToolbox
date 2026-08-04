import { useRef, useState } from 'react';

import { copyToClipboard, download, readUploadedFile } from '../lib/browser-io';

/** Turns pasted text into a C# string-concatenation literal. */
function buildOutput(content: string): string {
  let input = content;
  input = input.replace(/\r/g, '');
  input = input.replace(/"/g, '\\"');

  const lines = input.split('\n');
  if (lines.length === 0 || lines[0] === '') return '';

  let text = 'string text =';
  for (let i = 0; i < lines.length; i++) {
    text += `\r\n\t${i !== 0 ? '+' : ''}"${lines[i] === '\n' || lines[i] === '' ? '' : lines[i]}\\r\\n"`;
  }
  text += ';\r\n';

  return text;
}

export default function StringBuilder() {
  const [content, setContent] = useState('');
  const selectFile = useRef<HTMLInputElement>(null);

  const output = buildOutput(content);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>String Builder</h3>
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-auto text-right">
            <button
              className="btn btn-success ms-1 mt-1"
              type="button"
              onClick={() => selectFile.current?.click()}
            >
              Load File
            </button>
            <button className="btn btn-success ms-1 mt-1" type="button" onClick={() => setContent('')}>
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
            <button className="btn btn-success me-1 mt-1" onClick={() => download('code.cs', output)}>
              Save File
            </button>
          </div>
          <div className="col-auto text-right">
            <button
              className="btn btn-success ms-1 mt-1 float-right"
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
        onChange={(e) => readUploadedFile(e, setContent)}
      />
    </>
  );
}
