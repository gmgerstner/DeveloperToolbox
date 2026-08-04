import './Home.css';

export default function Home() {
  return (
    <div className="container home">
      <div className="row justify-content-center text-center">
        <div className="col-lg-8">
          <h1 className="home-title">Developer Toolbox</h1>
          <p className="home-subtitle">
            A small set of everyday utilities - parse and convert data, encode and decode
            strings, generate GUIDs and QR codes, and more. Pick a tool from the menu above.
          </p>
          <img
            className="home-image"
            src={`${import.meta.env.BASE_URL}assets/homepage_image.png`}
            alt="Developer Toolbox"
          />
        </div>
      </div>
    </div>
  );
}
