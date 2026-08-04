import { useState } from 'react';

import InputBox from './InputBox';
import OutputBox from './OutputBox';
import SettingsBox from './SettingsBox';
import { defaultSettings, type Settings } from './settings';
import './DataParser.css';

export default function DataParser() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [inputText, setInputText] = useState('');

  return (
    <div className="container-fluid data-parser">
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
