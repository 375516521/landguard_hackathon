import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
//import './MapPage.css'; // separate CSS for map and layout

// Helper component to capture map clicks
function MapClickHelper({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e);
    },
  });
  return null;
}

export default function MapPage() {
  const [parcels, setParcels] = useState([]);
  const [selected, setSelected] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const token = localStorage.getItem('lg_token');
      if (!token) return;
      const res = await axios.get('http://localhost:5000/api/parcels/me', {
        headers: { Authorization: 'Bearer ' + token },
      });
      setParcels(res.data || []);
      console.log('Fetched parcels:', res.data);
    } catch (err) {
      console.error('Error fetching parcels:', err);
    }
  };

  const handleMapClick = (e) => {
    setSelected({ latlng: e.latlng });
    console.log('Map clicked at:', e.latlng);
  };

  return (
    <div className="map-container">
      <div className="map-wrapper">
        <MapContainer
          center={[2.5, 20]}
          zoom={3}
          style={{ height: '100%', width: '100%' }}
          whenCreated={(map) => (mapRef.current = map)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHelper onClick={handleMapClick} />
          {parcels.map((p) =>
            p.geojson ? (
              <GeoJSON
                key={p._id}
                data={p.geojson}
                style={{ color: p.riskScore > 0.6 ? '#d9534f' : '#16a34a' }}
              />
            ) : null
          )}
        </MapContainer>
      </div>

      <aside className="sidebar">
        <h3>Your Parcels</h3>
        {parcels.length === 0 && <p className="muted">No parcels yet. Add one to start analysis.</p>}
        {parcels.map((p) => (
          <div className="parcel-item" key={p._id}>
            <strong>{p.name}</strong>
            <div className="muted">Risk: {p.riskScore?.toFixed(2) || 0}</div>
            <div style={{ marginTop: 8 }}>
              <a className="btn" href={`/parcel/${p._id}/edit`}>
                Edit / Re-analyze
              </a>
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}
