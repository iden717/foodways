import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
//eslint-disable-next-line  import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

import mapLocation from "../images/icon/mapLocation.png";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoiaWRlbjcxNyIsImEiOiJja21hYzNwdzExcWRkMm5wMXpvZG83ZWFkIn0.LwcJjx3STdpP7i2FFlwXZQ";

export function MapRender(props) {
  const MapContainer = useRef(null);
  const [lng, setLng] = useState(112.741278);
  const [lat, setLat] = useState(-7.268491);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: MapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-left");
    map.addControl(new mapboxgl.GeolocateControl(), "top-left");

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(map);

    const onDragEnd = () => {
      let lnglat = marker.getLngLat();
    };

    marker.on("dragend", onDragEnd);
    // return () => map.remove();
  }, []);
  return (
    <div>
      <div ref={MapContainer} style={{ width: "100%", height: "500px" }}>
        <div className="d-flex justify-content-end">
          <button
            onClick={props.setHide}
            class="mt-2 me-2 btn btn-close position-absolute fs-5"
            style={{ boxShadow: "none" }}
          ></button>
          <div
            className="container-fluid position-absolute"
            style={{ marginTop: "290px" }}
          >
            <div className="d-grid gap-2 col-md-4 mx-auto">
              <div className="card shadow" style={{ width: "100%" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <span className="fs-6 fw-bold ms-3">
                        Select delivery location
                      </span>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-2 ms-2">
                      <img src={mapLocation} alt="asd" />
                    </div>
                    <div className="col">
                      <div className="row">
                        <small className="fw-bold">Harbour Building</small>
                      </div>
                      <div className="row" style={{ height: "50px" }}>
                        <small>
                          Jl. Elang IV No.48, Sawah Lama, Kec. Ciputat,
                          KotaTangerang Selatan, Banten 15413, Indonesia
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <button className="btn btn-app btn-sm mt-3">
                        Comfirm Location
                      </button>
                    </div>
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
