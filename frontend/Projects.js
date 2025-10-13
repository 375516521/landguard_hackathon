import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Projects(){
  const [projects, setProjects] = useState([]);
  useEffect(()=>{ fetch(); }, []);
  async function fetch(){ const res = await axios.get('http://localhost:5000/api/marketplace/projects'); setProjects(res.data || []); }
  return (
    <div className='container'>
      <div className='card'>
        <h2>Marketplace Projects</h2>
        {projects.length===0 && <p className='muted'>No projects yet.</p>}
        {projects.map(p=> (
          <div key={p._id} style={{padding:10, borderBottom:'1px solid #f0f0f0'}}>
            <strong>{p.title}</strong><div className='muted'>Funding needed: ${p.fundingNeeded}</div>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

