import React, { useEffect, useState } from 'react';
import api from '../api';

function User({ onHome }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/user')
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{margin:0}}>Usuario</h2>
        {onHome && (
          <button onClick={onHome} style={{padding:'6px 14px', borderRadius:'6px', background:'#e2e8f0', border:'none', color:'#222', fontWeight:'bold', cursor:'pointer'}}>Home</button>
        )}
      </div>
      {!user ? (
        <div>Cargando...</div>
      ) : (
        <ul style={{listStyle:'none', padding:0}}>
          {Object.entries(user).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {String(value)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default User;
