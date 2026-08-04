export default function Home() {
  return (
    <div className="row">
      <div className="col text-center">
        <img src={`${import.meta.env.BASE_URL}assets/homepage_image.png`} height="500px" alt="Developer Toolbox" />
      </div>
    </div>
  );
}
