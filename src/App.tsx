import { Route, Routes } from 'react-router';

import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import BootstrapFormGenerator from './pages/BootstrapFormGenerator';
import DataParser from './pages/data-parser/DataParser';
import GuidGenerator from './pages/GuidGenerator';
import Home from './pages/Home';
import LoremIpsum from './pages/LoremIpsum';
import MissingPage from './pages/MissingPage';
import QrCodes from './pages/qrcodes/QrCodes';
import RelativePath from './pages/RelativePath';
import StringBuilder from './pages/StringBuilder';
import StringEncoder from './pages/string-encoder/StringEncoder';
import StringLength from './pages/StringLength';

export default function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <Toolbar />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data-parser" element={<DataParser />} />
            <Route path="/string-length" element={<StringLength />} />
            <Route path="/string-builder" element={<StringBuilder />} />
            <Route path="/string-encoder" element={<StringEncoder />} />
            <Route path="/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/qr-codes" element={<QrCodes />} />
            <Route path="/guid-generator" element={<GuidGenerator />} />
            <Route path="/bootstrap-forms" element={<BootstrapFormGenerator />} />
            <Route path="/relative-path" element={<RelativePath />} />
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Footer />
        </div>
      </div>
    </div>
  );
}
