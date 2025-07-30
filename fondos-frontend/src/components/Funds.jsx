import React, { useEffect, useState } from 'react';
import api from '../api';

function Funds({ onHome }) {
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    api.get('/funds')
      .then(response => {
        setFunds(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2 style={{marginBottom:'12px'}}>Lista de Fondos</h2>
      {onHome && (
        <div style={{marginBottom:'18px', textAlign:'right'}}>
          <button onClick={onHome} style={{padding:'6px 14px', borderRadius:'6px', background:'#e2e8f0', border:'none', color:'#222', fontWeight:'bold', cursor:'pointer'}}>Home</button>
        </div>
      )}
      {funds.length === 0 ? (
        <div>No hay fondos disponibles.</div>
      ) : (
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#e2e8f0'}}>
              {Object.keys(funds[0]).map(key => (
                <th key={key} style={{padding:'8px', border:'1px solid #cbd5e1', textAlign:'left'}}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, idx) => (
              <tr key={idx}>
                {Object.values(fund).map((value, i) => (
                  <td key={i} style={{padding:'8px', border:'1px solid #cbd5e1'}}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Funds;