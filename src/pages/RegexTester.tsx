import { type ReactNode, useMemo, useRef, useState } from 'react';

import { copyToClipboard, download, readUploadedFile } from '../lib/browser-io';
import './RegexTester.css';

interface RegexSession {
  input: string;
  pattern: string;
  flags: string;
  replacement: string;
}

interface MatchInfo {
  index: number;
  match: string;
  groups: (string | undefined)[];
  namedGroups?: Record<string, string>;
}

const AVAILABLE_FLAGS = [
  { flag: 'g', label: 'g (Global)' },
  { flag: 'i', label: 'i (Case Insensitive)' },
  { flag: 'm', label: 'm (Multiline)' },
  { flag: 's', label: 's (Dot All)' },
  { flag: 'u', label: 'u (Unicode)' },
] as const;

export default function RegexTester() {
  const [input, setInput] = useState('');
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [replacement, setReplacement] = useState('');
  const [sessionError, setSessionError] = useState<string | null>(null);

  const sessionFileRef = useRef<HTMLInputElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, '') : prev + flag,
    );
  };

  const { regex, regexError } = useMemo(() => {
    if (!pattern) {
      return { regex: null, regexError: null };
    }
    try {
      return { regex: new RegExp(pattern, flags), regexError: null };
    } catch (err) {
      return {
        regex: null,
        regexError: err instanceof Error ? err.message : 'Invalid regular expression',
      };
    }
  }, [pattern, flags]);

  const { matches, highlightedNodes, replacedOutput } = useMemo(() => {
    if (!regex || !input) {
      return {
        matches: [] as MatchInfo[],
        highlightedNodes: input ? [input] : ([] as ReactNode[]),
        replacedOutput: input,
      };
    }

    const foundMatches: MatchInfo[] = [];
    const nodes: ReactNode[] = [];
    const matchRegex = new RegExp(regex.source, regex.flags);
    const isGlobal = matchRegex.global;

    let lastCursor = 0;
    let matchCount = 0;
    let execResult: RegExpExecArray | null;

    while ((execResult = matchRegex.exec(input)) !== null) {
      const matchStart = execResult.index;
      const matchText = execResult[0];
      const matchEnd = matchStart + matchText.length;

      foundMatches.push({
        index: matchStart,
        match: matchText,
        groups: execResult.slice(1),
        namedGroups: execResult.groups ? { ...execResult.groups } : undefined,
      });

      if (matchStart > lastCursor) {
        nodes.push(input.slice(lastCursor, matchStart));
      }

      const highlightClass =
        matchCount % 2 === 0 ? 'regex-match-even' : 'regex-match-odd';
      nodes.push(
        <mark key={`match-${matchCount}-${matchStart}`} className={highlightClass}>
          {matchText}
        </mark>,
      );

      lastCursor = matchEnd;
      matchCount++;

      if (!isGlobal) {
        break;
      }

      if (matchText.length === 0) {
        matchRegex.lastIndex++;
        if (matchRegex.lastIndex > input.length) {
          break;
        }
      }
    }

    if (lastCursor < input.length) {
      nodes.push(input.slice(lastCursor));
    }

    let replaced = input;
    try {
      replaced = input.replace(regex, replacement);
    } catch {
      replaced = input;
    }

    return {
      matches: foundMatches,
      highlightedNodes: nodes,
      replacedOutput: replaced,
    };
  }, [regex, input, replacement]);

  const formattedMatchesText = useMemo(() => {
    if (matches.length === 0) {
      return '';
    }
    return matches
      .map((m, idx) => {
        const groupLines = m.groups
          .map((g, gIdx) => `  Group ${gIdx + 1}: ${g ?? '(unmatched)'}`)
          .join('\n');
        return `Match ${idx + 1} (index ${m.index}): "${m.match}"${
          groupLines ? `\n${groupLines}` : ''
        }`;
      })
      .join('\n\n');
  }, [matches]);

  const handleSaveSession = () => {
    const session: RegexSession = {
      input,
      pattern,
      flags,
      replacement,
    };
    download('regex-session.json', JSON.stringify(session, null, 2));
  };

  const handleLoadSession = (text: string) => {
    try {
      const parsed = JSON.parse(text) as Partial<RegexSession>;
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Session file must contain a JSON object.');
      }
      setInput(typeof parsed.input === 'string' ? parsed.input : '');
      setPattern(typeof parsed.pattern === 'string' ? parsed.pattern : '');
      setFlags(typeof parsed.flags === 'string' ? parsed.flags : 'g');
      setReplacement(typeof parsed.replacement === 'string' ? parsed.replacement : '');
      setSessionError(null);
    } catch (err) {
      setSessionError(
        err instanceof Error ? err.message : 'Failed to parse session JSON file.',
      );
    }
  };

  const handleClear = () => {
    setInput('');
    setPattern('');
    setFlags('g');
    setReplacement('');
    setSessionError(null);
  };

  return (
    <>
      <div className="container">
        <div className="row mb-3 align-items-center">
          <div className="col">
            <h3>Regex Tester & Parser</h3>
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-primary me-1"
              onClick={handleSaveSession}
            >
              Save Session
            </button>
            <button
              type="button"
              className="btn btn-primary me-1"
              onClick={() => sessionFileRef.current?.click()}
            >
              Load Session
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>

        {sessionError && (
          <div className="alert alert-danger" role="alert">
            {sessionError}
          </div>
        )}

        {/* Regex Pattern & Flags */}
        <div className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Regular Expression</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() =>
                copyToClipboard(`/${pattern}/${flags}`, 'Regex copied to clipboard')
              }
            >
              Copy Regex
            </button>
          </div>
          <div className="card-body">
            <div className="input-group mb-2">
              <span className="input-group-text">/</span>
              <input
                type="text"
                className="form-control font-monospace"
                placeholder="Enter regex pattern..."
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
              <span className="input-group-text">/{flags}</span>
            </div>

            <div className="d-flex flex-wrap gap-3 mt-2">
              {AVAILABLE_FLAGS.map(({ flag, label }) => (
                <div className="form-check form-check-inline" key={flag}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`flag-${flag}`}
                    checked={flags.includes(flag)}
                    onChange={() => toggleFlag(flag)}
                  />
                  <label className="form-check-label" htmlFor={`flag-${flag}`}>
                    {label}
                  </label>
                </div>
              ))}
            </div>

            {regexError && (
              <div className="alert alert-danger mt-2 mb-0" role="alert">
                {regexError}
              </div>
            )}
          </div>
        </div>

        {/* Replacement Pattern */}
        <div className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Replacement Pattern</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() =>
                copyToClipboard(replacement, 'Replacement copied to clipboard')
              }
            >
              Copy Replacement
            </button>
          </div>
          <div className="card-body">
            <input
              type="text"
              className="form-control font-monospace"
              placeholder="Enter replacement string (e.g. $1, $&, etc.)..."
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
            />
          </div>
        </div>

        {/* Input Text */}
        <div className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Input Text</span>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary me-1"
                onClick={() => inputFileRef.current?.click()}
              >
                Load Input File
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => copyToClipboard(input, 'Input copied to clipboard')}
              >
                Copy Input
              </button>
            </div>
          </div>
          <div className="card-body">
            <textarea
              className="form-control font-monospace"
              rows={8}
              placeholder="Enter or paste text to test against..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>

        {/* Highlighted Results & Match Details */}
        <div className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Highlighted Results ({matches.length} matches)</span>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary me-1"
                disabled={matches.length === 0}
                onClick={() =>
                  copyToClipboard(
                    formattedMatchesText,
                    'Matches copied to clipboard',
                  )
                }
              >
                Copy Matches
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                disabled={matches.length === 0}
                onClick={() => download('regex-matches.txt', formattedMatchesText)}
              >
                Save Matches
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="regex-highlight-box mb-3">
              {input ? (
                highlightedNodes
              ) : (
                <span className="text-muted">
                  Enter input text and a pattern to preview highlighted matches.
                </span>
              )}
            </div>

            {matches.length > 0 && (
              <div className="regex-match-list">
                <h6>Match Details & Capture Groups</h6>
                <ul className="list-group">
                  {matches.map((m, idx) => (
                    <li
                      key={`detail-${idx}-${m.index}`}
                      className="list-group-item font-monospace small"
                    >
                      <div>
                        <strong>Match #{idx + 1}</strong> (Index {m.index}):{' '}
                        <code>{m.match}</code>
                      </div>
                      {m.groups.length > 0 && (
                        <div className="mt-1 ps-3">
                          {m.groups.map((grp, gIdx) => (
                            <div key={`group-${idx}-${gIdx}`}>
                              Group {gIdx + 1}:{' '}
                              {grp !== undefined ? (
                                <code>{grp}</code>
                              ) : (
                                <span className="text-muted">(unmatched)</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {m.namedGroups && Object.keys(m.namedGroups).length > 0 && (
                        <div className="mt-1 ps-3">
                          {Object.entries(m.namedGroups).map(([name, val]) => (
                            <div key={`named-${idx}-${name}`}>
                              Named Group ({name}):{' '}
                              {val !== undefined ? (
                                <code>{val}</code>
                              ) : (
                                <span className="text-muted">(unmatched)</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Replaced Output */}
        <div className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Replaced Output</span>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary me-1"
                onClick={() => setInput(replacedOutput)}
              >
                Move to Input
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary me-1"
                onClick={() => download('regex-results.txt', replacedOutput)}
              >
                Save Results
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  copyToClipboard(replacedOutput, 'Output copied to clipboard')
                }
              >
                Copy Output
              </button>
            </div>
          </div>
          <div className="card-body">
            <textarea
              className="form-control font-monospace"
              rows={8}
              readOnly
              value={replacedOutput}
            />
          </div>
        </div>
      </div>

      <input
        style={{ display: 'none' }}
        type="file"
        accept=".json,application/json"
        ref={sessionFileRef}
        onChange={(e) => readUploadedFile(e, handleLoadSession)}
      />
      <input
        style={{ display: 'none' }}
        type="file"
        ref={inputFileRef}
        onChange={(e) => readUploadedFile(e, setInput)}
      />
    </>
  );
}