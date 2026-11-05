import { v4 as uuidv4 } from 'uuid';

import { usePersistentState } from '../lib/persistent-state';

export default function GuidGenerator() {
  const [guids, setGuids] = usePersistentState('guid.guids', '');

  const generateGuids = () => {
    let next = '';
    for (let i = 0; i < 10; i++) {
      next += `${uuidv4()}\r\n`;
    }
    setGuids(next);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>GUID Generator</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-primary mb-1" onClick={generateGuids}>
            Generate GUIDs
          </button>
          <button type="button" className="btn btn-secondary mb-1 ms-1" onClick={() => setGuids('')}>
            Reset
          </button>
        </div>
        <div className="row">
          <div className="col">
            <textarea className="form-control" rows={15} readOnly value={guids} />
          </div>
        </div>
      </div>
    </div>
  );
}
