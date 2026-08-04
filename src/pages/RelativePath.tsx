import { useState } from 'react';

import { copyToClipboard } from '../lib/browser-io';
import './RelativePath.css';

function parsePath(path: string, delimiter: string): string[] {
  // Normalize the path and split by delimiter
  const normalized = path.replace(/^[A-Za-z]:/, '').replace(/^[/\\]+/, '').replace(/[/\\]+$/, '');
  return normalized
    .split(new RegExp(`[${delimiter === '/' ? '/' : '\\\\'}]+`))
    .filter((part) => part.length > 0);
}

function calcRelativePath(fromArray: string[], toArray: string[], splitBy: string): string {
  // Find the common prefix length
  let commonLength = 0;
  const minLength = Math.min(fromArray.length, toArray.length);

  for (let i = 0; i < minLength; i++) {
    if (fromArray[i] === toArray[i]) {
      commonLength++;
    } else {
      break;
    }
  }

  // Calculate how many levels to go up
  const upLevels = fromArray.length - commonLength;

  // Get the remaining path from target
  const remainingPath = toArray.slice(commonLength);

  // Build the relative path
  let result = '';

  // Add ".." for each level up
  for (let i = 0; i < upLevels; i++) {
    result += '..' + splitBy;
  }

  // Add the remaining path
  if (remainingPath.length > 0) {
    result += remainingPath.join(splitBy);
  }

  // Handle edge cases
  if (!result) {
    result = '.'; // Same directory
  } else if (result.endsWith(splitBy)) {
    result = result.slice(0, -1); // Remove trailing separator
  }

  return result;
}

export default function RelativePath() {
  const [firstPath, setFirstPath] = useState('');
  const [secondPath, setSecondPath] = useState('');
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [showResults, setShowResults] = useState(false);

  const calculate = () => {
    if (!firstPath || !secondPath) {
      return;
    }

    // Detect path separator
    const isUnix = firstPath.indexOf('/') > -1;
    const splitBy = isUnix ? '/' : '\\';

    // Parse paths
    const firstArray = parsePath(firstPath, splitBy);
    const secondArray = parsePath(secondPath, splitBy);

    // Calculate both relative paths
    setResult1(calcRelativePath(firstArray, secondArray, splitBy));
    setResult2(calcRelativePath(secondArray, firstArray, splitBy));
    setShowResults(true);
  };

  const reset = () => {
    setFirstPath('');
    setSecondPath('');
    setResult1('');
    setResult2('');
    setShowResults(false);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      calculate();
    }
  };

  return (
    <div className="container relative-path">
      <div className="row">
        <div className="col">
          <h1>Relative Path Calculator</h1>
          <p>Calculate the relative path between two file or directory paths.</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">From Path</div>
            <div className="card-body">
              <input
                type="text"
                className="form-control"
                value={firstPath}
                onChange={(e) => setFirstPath(e.target.value)}
                placeholder="e.g., C:\Users\Documents\project or /home/user/project"
                onKeyDown={onEnter}
              />
              <small className="form-text text-muted mt-2">
                Enter the source path (supports both Windows and Unix paths)
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">To Path</div>
            <div className="card-body">
              <input
                type="text"
                className="form-control"
                value={secondPath}
                onChange={(e) => setSecondPath(e.target.value)}
                placeholder="e.g., C:\Users\Pictures\vacation or /home/user/photos"
                onKeyDown={onEnter}
              />
              <small className="form-text text-muted mt-2">Enter the destination path</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col text-center">
          <button
            className="btn btn-primary btn-lg me-2"
            onClick={calculate}
            disabled={!firstPath || !secondPath}
          >
            Calculate
          </button>
          <button className="btn btn-secondary btn-lg" onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      {showResults && (
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card result-card">
              <div className="card-header">Result: From Path → To Path</div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <code className="flex-grow-1">{result1}</code>
                  <button
                    className="btn btn-sm btn-outline-primary ms-2"
                    onClick={() => copyToClipboard(result1, 'Copied to clipboard!')}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card result-card">
              <div className="card-header">Result: To Path → From Path</div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <code className="flex-grow-1">{result2}</code>
                  <button
                    className="btn btn-sm btn-outline-primary ms-2"
                    onClick={() => copyToClipboard(result2, 'Copied to clipboard!')}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
