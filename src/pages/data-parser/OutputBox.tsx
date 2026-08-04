import { useState } from 'react';

import { copyToClipboard } from '../../lib/browser-io';
import { DataParserCommon } from './data-parser-common';
import { CSharpParser } from './parsers/c-sharp-parser';
import { HtmlParser } from './parsers/html-parser';
import { JsonParser } from './parsers/json-parser';
import { LatexParser } from './parsers/latex-parser';
import { SqlWithXmlParser } from './parsers/sql-with-xml-parser';
import { XmlParser } from './parsers/xml-parser';
import type { Settings } from './settings';

interface OutputBoxProps {
  inputText: string;
  settings: Settings;
}

export default function OutputBox({ inputText, settings }: OutputBoxProps) {
  const [converterType, setConverterType] = useState('xml');
  const [outputText, setOutputText] = useState('');

  const parse = () => {
    //test for delimiter
    //count the number of commas
    let RE = new RegExp('[^,]', 'gi');
    const numCommas = inputText.replace(RE, '').length;

    //set delimiter
    let columnDelimiter = ',';

    if (settings.delimiter === 'comma') {
      columnDelimiter = ',';
    } else if (settings.delimiter === 'tab') {
      columnDelimiter = '\t';
    } else if (settings.delimiter === 'auto') {
      //count the number of tabs
      RE = new RegExp('[^\t]', 'gi');
      const numTabs = inputText.replace(RE, '').length;
      if (numTabs > numCommas) {
        columnDelimiter = '\t';
      }
    }

    const parsedArray = DataParserCommon.CSVToArray(inputText, columnDelimiter);

    if (converterType === 'xml') {
      setOutputText(new XmlParser().parse(parsedArray, settings));
    } else if (converterType === 'sql-with-xml') {
      setOutputText(new SqlWithXmlParser().parse(parsedArray, settings));
    } else if (converterType === 'csharp') {
      setOutputText(new CSharpParser().parse(parsedArray, settings));
    } else if (converterType === 'html') {
      setOutputText(new HtmlParser().parse(parsedArray, settings));
    } else if (converterType === 'json') {
      setOutputText(new JsonParser().parse(parsedArray, settings));
    } else if (converterType === 'latex') {
      setOutputText(new LatexParser().parse(parsedArray, settings));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row p-0">
        <div className="col-md-12 p-0">
          <div className="card border-dark">
            <div className="card-header text-white">Output Text</div>
            <div className="card-body">
              <div className="form-group">
                <div className="row p-0">
                  <div className="col-md-12 p-0 mb-1">
                    <select value={converterType} onChange={(e) => setConverterType(e.target.value)}>
                      <option value="xml">XML</option>
                      <option value="sql-with-xml">SQL w/XML</option>
                      <option value="csharp">C#</option>
                      <option value="html">HTML</option>
                      <option value="json">JSON</option>
                      <option value="latex">LaTeX</option>
                    </select>
                    <button className="btn btn-primary btn-sm ms-1" onClick={parse}>
                      Parse
                    </button>
                    <button
                      className="btn btn-primary btn-sm ms-1"
                      onClick={() => copyToClipboard(outputText, 'Link copied to clipboard')}
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="row p-0">
                  <div className="col-md-12 p-0">
                    <textarea
                      className="form-control"
                      id="output-textarea"
                      name="textarea"
                      rows={12}
                      value={outputText}
                      onChange={(e) => setOutputText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
