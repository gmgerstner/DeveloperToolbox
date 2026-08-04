interface InputBoxProps {
  inputText: string;
  onInputTextChanged: (value: string) => void;
}

export default function InputBox({ inputText, onInputTextChanged }: InputBoxProps) {
  return (
    <div className="container-fluid">
      <div className="row p-0">
        <div className="col-md-12 p-0">
          <div className="card border-dark">
            <div className="card-header text-white">Input Text</div>
            <div className="card-body">
              <div className="form-group">
                <div className="row p-0">
                  <div className="col-md-12 p-0">
                    <textarea
                      className="form-control"
                      id="input-textarea"
                      name="textarea"
                      rows={12}
                      value={inputText}
                      onChange={(e) => onInputTextChanged(e.target.value)}
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
