import { useState } from 'react';

import { clearPersistentState, usePersistentState } from '../../lib/persistent-state';
import InputBox from './InputBox';
import OutputBox from './OutputBox';
import SettingsBox from './SettingsBox';
import { defaultSettings, type Settings } from './settings';
import './DataParser.css';

export default function DataParser() {
  // Bumped on reset so every box remounts and re-reads its (now cleared) state.
  const [resetKey, setResetKey] = useState(0);

  const reset = () => {
    clearPersistentState('dataParser.');
    setResetKey((k) => k + 1);
  };

  return <DataParserContent key={resetKey} onReset={reset} />;
}

function DataParserContent({ onReset }: { onReset: () => void }) {
  const [settings, setSettings] = usePersistentState<Settings>('dataParser.settings', defaultSettings);
  const [inputText, setInputText] = usePersistentState('dataParser.inputText', '');

  return (
    <div className="container-fluid data-parser">
      <div className="row mb-2">
        <div className="col text-end">
          <button type="button" className="btn btn-secondary" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <SettingsBox settings={settings} onSettingsChanged={setSettings} />
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-12">
              <InputBox inputText={inputText} onInputTextChanged={setInputText} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <OutputBox inputText={inputText} settings={settings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
