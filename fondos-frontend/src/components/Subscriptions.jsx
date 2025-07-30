import React, { useEffect, useState } from 'react';
import api from '../api';

function Subscriptions({ onHome }) {
  const [subs, setSubs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/subscriptions')
      .then(response => setSubs(response.data))
      .catch(error => setError(error.response?.data?.detail || 'Error al cargar suscripciones'));
  }, []);

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{margin:0}}>Suscripciones Activas</h2>
        {onHome && (
          <button onClick={onHome} style={{padding:'6px 14px', borderRadius:'6px', background:'#e2e8f0', border:'none', color:'#222', fontWeight:'bold', cursor:'pointer'}}>Home</button>
        )}
      </div>
      {error ? (
        <div style={{color:'red'}}>{error}</div>
      ) : subs.length === 0 ? (
        <div>No hay suscripciones activas.</div>
      ) : (
        <ul style={{listStyle:'none', padding:0}}>
          {subs.map((sub, idx) => (
            <li key={idx} style={{marginBottom:'8px', background:'#e2e8f0', borderRadius:'6px', padding:'8px'}}>
              {Object.entries(sub).map(([key, value]) => (
                <div key={key}><strong>{key}:</strong> {String(value)}</div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Subscriptions;
