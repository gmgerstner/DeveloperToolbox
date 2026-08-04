import { Link, NavLink } from 'react-router';

export default function Toolbar() {
  return (
    <div className="container-fluid mb-3">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Developer Toolbox</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/data-parser">Data Parser</NavLink>
              </li>
              {/* https://codebeautify.org/calculate-string-length */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/string-length">String Length</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/string-builder">String Builder</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/string-encoder">String Encode/Decode</NavLink>
              </li>
              {/* http://asdfast.beobit.net/docs/ */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/lorem-ipsum">Lorem Ipsum</NavLink>
              </li>
              {/* https://www.programmertools.online/generator/qrcode.html */}
              {/* https://www.npmjs.com/package/qrcode */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/qr-codes">QR Codes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/guid-generator">GUID Generator</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/relative-path">Relative Path</NavLink>
              </li>
              {/* see also:
                    https://www.browserling.com/tools
                    https://coding.tools
              */}
              {/* Bootstrap Forms (/bootstrap-forms) is routable but kept out of
                  the nav, same as in the Angular app. */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
