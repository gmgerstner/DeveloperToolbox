import { Link } from 'react-router';

export default function Footer() {
  return (
    <div className="container-fluid">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
          </Link>
          <span className="text-muted">© Copyright 2025, GMG Digital Technologies. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
