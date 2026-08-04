import { useRef, useState } from 'react';

import { copyToClipboard, download, readUploadedFile } from '../lib/browser-io';

export default function StringLength() {
  const [content, setContent] = useState('');
  const selectFile = useRef<HTMLInputElement>(null);

  const characterCount = content.length;
  const characterCountNoSpaces = content.replace(/\s/g, '').length;

  const wordCount = (() => {
    if (!content || content.trim() === '') {
      return 0;
    }

    // Split by whitespace and filter out empty strings
    return content.trim().split(/\s+/).filter((word) => word.length > 0).length;
  })();

  const lineCount = content ? content.split(/\r\n|\r|\n/).length : 0;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Calculate String Length</h3>
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
          <div className="col">
            <button
              className="btn btn-success me-1 mt-1"
              onClick={() => download('content.txt', content)}
            >
              Save File
            </button>
          </div>
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
            <button
              className="btn btn-success ms-1 mt-1 float-right"
              type="button"
              onClick={() => copyToClipboard(content, 'Contents copied to clipboard')}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="row mt-3">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Text Statistics</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <div className="text-center">
                      <h6 className="text-muted">Characters</h6>
                      <h4 className="text-primary">{characterCount}</h4>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center">
                      <h6 className="text-muted">Characters (no spaces)</h6>
                      <h4 className="text-primary">{characterCountNoSpaces}</h4>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center">
                      <h6 className="text-muted">Words</h6>
                      <h4 className="text-success">{wordCount}</h4>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center">
                      <h6 className="text-muted">Lines</h6>
                      <h4 className="text-info">{lineCount}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
