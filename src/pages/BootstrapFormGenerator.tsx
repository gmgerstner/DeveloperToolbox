export default function BootstrapFormGenerator() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Bootstrap Form Generator</h3>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <ul className="nav nav-tabs" id="control-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="textbox-tab" data-bs-toggle="tab" data-bs-target="#textbox" type="button" role="tab" aria-controls="textbox" aria-selected="true">Inputs</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="options-tab" data-bs-toggle="tab" data-bs-target="#options" type="button" role="tab" aria-controls="options" aria-selected="false">Options</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="dropdown-tab" data-bs-toggle="tab" data-bs-target="#dropdown" type="button" role="tab" aria-controls="dropdown" aria-selected="false">Dropdown</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="buttons-tab" data-bs-toggle="tab" data-bs-target="#buttons" type="button" role="tab" aria-controls="buttons" aria-selected="false">Buttons</button>
            </li>
          </ul>

          <div className="tab-content" id="control-tab-content">
            <div className="tab-pane fade show active" id="textbox" role="tabpanel" aria-labelledby="textbox-tab">
              Input<br />

              <button className="btn btn-success ms-1 mt-1" type="button">Add Component</button>
            </div>
            <div className="tab-pane fade" id="options" role="tabpanel" aria-labelledby="options-tab">
              Options (Radio/Checkboxes)<br />

              <button className="btn btn-success ms-1 mt-1" type="button">Add Component</button>
            </div>
            <div className="tab-pane fade" id="dropdown" role="tabpanel" aria-labelledby="dropdown-tab">
              Dropdown<br />

              <button className="btn btn-success ms-1 mt-1" type="button">Add Component</button>
            </div>
            <div className="tab-pane fade" id="buttons" role="tabpanel" aria-labelledby="buttons-tab">
              Buttons<br />

              <button className="btn btn-success ms-1 mt-1" type="button">Add Component</button>
            </div>
          </div>
        </div>

        <div className="col">
          <ul className="nav nav-tabs" id="results-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="preview-tab" data-bs-toggle="tab" data-bs-target="#preview" type="button" role="tab" aria-controls="preview" aria-selected="true">Preview</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="html-tab" data-bs-toggle="tab" data-bs-target="#html" type="button" role="tab" aria-controls="html" aria-selected="false">HTML</button>
            </li>
          </ul>

          <div className="tab-content" id="preview-tab-content">
            <div className="tab-pane fade show active" id="preview" role="tabpanel" aria-labelledby="preview-tab">
              Preview
            </div>
            <div className="tab-pane fade" id="html" role="tabpanel" aria-labelledby="html-tab">
              html
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
