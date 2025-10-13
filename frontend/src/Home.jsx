import React from 'react';
export default function Home(){
  return (
    <div className='container'>
      <div className='card hero'>
        <div style={{flex:1}}>
          <h1>LandGuard AI — Pan-African Land Degradation Monitoring</h1>
          <p className='muted'>Upload land, get AI-driven degradation analysis, connect with restoration partners, and fund projects — all in one place.</p>
          <div style={{marginTop:16}}>
            <a className='btn' href='/map'>Explore Map</a>
            <a style={{marginLeft:8}} className='btn' href='/parcel/create'>Add Parcel</a>
          </div>
        </div>
        <div style={{width:360}}>
          <div className='card' style={{background:'#e9f7ee'}}>
            <h3 style={{marginTop:0}}>Why LandGuard?</h3>
            <ul className='muted'>
              <li>AI-powered detection (satellite imagery)</li>
              <li>Pan-African coverage</li>
              <li>Marketplace to fund restoration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
