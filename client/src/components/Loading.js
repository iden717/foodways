export const Loading = () => {
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-danger me-2" role="status"></div>
          <div className="spinner-grow text-warning me-2" role="status"></div>
          <div className="spinner-grow text-dark" role="status"></div>
        </div>
      </div>
    </div>
  );
};
