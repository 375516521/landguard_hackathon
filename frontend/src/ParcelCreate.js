import React, {useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ParcelCreate(){
  const [form, setForm] = useState({ name:'', description:'', country:'', areaHectares:0, geojson: null });
  const [geoText, setGeoText] = useState('');

  const submit = async e => {
    e.preventDefault();
    try{
      // parse geojson if provided
      let geo = null;
      if (geoText) {
        geo = JSON.parse(geoText);
      } else {
        alert('For this demo please paste a GeoJSON Polygon in the box (or use the map-draw in future).');
        return;
      }
      const token = localStorage.getItem('lg_token');
      const res = await axios.post('http://localhost:5000/api/parcels', { ...form, geojson: geo }, { headers: { Authorization: 'Bearer '+token } });
      toast.success('Parcel created and analysis triggered');
    }catch(err){ toast.error(err.response?.data?.message || 'Error'); console.error(err); }
  };

  return (
    <div className='container'>
      <div className='card' style={{maxWidth:800, margin:'0 auto'}}>
        <h2>Add Parcel</h2>
        <form onSubmit={submit}>
          <label>Parcel Name</label>
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <label>Description</label>
          <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
          <label>Country</label>
          <input value={form.country} onChange={e=>setForm({...form, country:e.target.value})} />
          <label>Area (hectares)</label>
          <input type='number' value={form.areaHectares} onChange={e=>setForm({...form, areaHectares: Number(e.target.value)})} />
          <label>GeoJSON (Polygon) - paste here</label>
          <textarea value={geoText} onChange={e=>setGeoText(e.target.value)} placeholder='{"type":"Feature","geometry":{...}}' style={{height:160}} />
          <div style={{marginTop:12}}><button className='btn' type='submit'>Create Parcel & Analyze</button></div>
        </form>
      </div>
    </div>
  );
}
