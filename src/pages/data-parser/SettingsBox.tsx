import type { Settings } from './settings';

interface SettingsBoxProps {
  settings: Settings;
  onSettingsChanged: (settings: Settings) => void;
}

export default function SettingsBox({ settings, onSettingsChanged }: SettingsBoxProps) {
  const update = (patch: Partial<Settings>) => onSettingsChanged({ ...settings, ...patch });

  return (
    <div className="container-fluid">
      <div className="row" id="description">
        <h1>Data Parser</h1>
        <p>Convert Excel data into one of several web-friendly formats, including HTML, JSON and XML.</p>
      </div>

      <hr />

      <div className="row" id="settings">
        <h3>Settings:</h3>
        <form>
          <div className="form-group mb-2">
            <label>Delimiter</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  name="delimiter"
                  id="delimiter_0"
                  type="radio"
                  className="form-check-input"
                  checked={settings.delimiter === 'auto'}
                  onChange={() => update({ delimiter: 'auto' })}
                />
                <label htmlFor="delimiter_0" className="form-check-label">Auto</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  name="delimiter"
                  id="delimiter_1"
                  type="radio"
                  className="form-check-input"
                  checked={settings.delimiter === 'comma'}
                  onChange={() => update({ delimiter: 'comma' })}
                />
                <label htmlFor="delimiter_1" className="form-check-label">Comma</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  name="delimiter"
                  id="delimiter_2"
                  type="radio"
                  className="form-check-input"
                  checked={settings.delimiter === 'tab'}
                  onChange={() => update({ delimiter: 'tab' })}
                />
                <label htmlFor="delimiter_2" className="form-check-label">Tab</label>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <label>Decimal Sign</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  name="decimal"
                  id="decimal_0"
                  type="radio"
                  className="form-check-input"
                  checked={settings.decimalSign === 'dot'}
                  onChange={() => update({ decimalSign: 'dot' })}
                />
                <label htmlFor="decimal_0" className="form-check-label">Dot</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  name="decimal"
                  id="decimal_1"
                  type="radio"
                  className="form-check-input"
                  checked={settings.decimalSign === 'comma'}
                  onChange={() => update({ decimalSign: 'comma' })}
                />
                <label htmlFor="decimal_1" className="form-check-label">Comma</label>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div>
              <div className="form-check form-check-inline">
                <input
                  name="headersProvidedCB"
                  id="headersProvidedCB_0"
                  type="checkbox"
                  className="form-check-input"
                  checked={settings.firstRowHeader}
                  onChange={(e) => update({ firstRowHeader: e.target.checked })}
                />
                <label htmlFor="headersProvidedCB_0" className="form-check-label">
                  First row is the header
                </label>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <label>Transform</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  name="headerModifications"
                  id="headerModifications_0"
                  type="radio"
                  className="form-check-input"
                  checked={settings.transformCase === 'downcase'}
                  onChange={() => update({ transformCase: 'downcase' })}
                />
                <label htmlFor="headerModifications_0" className="form-check-label">Lowercase</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  name="headerModifications"
                  id="headerModifications_1"
                  type="radio"
                  className="form-check-input"
                  checked={settings.transformCase === 'upcase'}
                  onChange={() => update({ transformCase: 'upcase' })}
                />
                <label htmlFor="headerModifications_1" className="form-check-label">Uppercase</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  name="headerModifications"
                  id="headerModifications_2"
                  type="radio"
                  className="form-check-input"
                  checked={settings.transformCase === 'none'}
                  onChange={() => update({ transformCase: 'none' })}
                />
                <label htmlFor="headerModifications_2" className="form-check-label">None</label>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <div>
              <div className="form-check form-check-inline">
                <input
                  name="includeWhiteSpaceCB"
                  id="includeWhiteSpaceCB_0"
                  type="checkbox"
                  className="form-check-input"
                  checked={settings.includeWhiteSpace}
                  onChange={(e) => update({ includeWhiteSpace: e.target.checked })}
                />
                <label htmlFor="includeWhiteSpaceCB_0" className="form-check-label">
                  Include white space in output
                </label>
              </div>
            </div>
          </div>

          <div className="form-group mb-2">
            <label>Indent with</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  name="indentType"
                  id="indentType_0"
                  type="radio"
                  className="form-check-input"
                  checked={settings.indentWith === 'tabs'}
                  onChange={() => update({ indentWith: 'tabs' })}
                />
                <label htmlFor="indentType_0" className="form-check-label">Tabs</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  name="indentType"
                  id="indentType_1"
                  type="radio"
                  className="form-check-input"
                  checked={settings.indentWith === 'spaces'}
                  onChange={() => update({ indentWith: 'spaces' })}
                />
                <label htmlFor="indentType_1" className="form-check-label">Spaces</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
