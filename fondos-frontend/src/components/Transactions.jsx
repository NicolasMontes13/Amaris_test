import React, { useEffect, useState } from 'react';
import api from '../api';

function Transactions({ onHome }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{margin:0}}>Historial de Transacciones</h2>
        {onHome && (
          <button onClick={onHome} style={{padding:'6px 14px', borderRadius:'6px', background:'#e2e8f0', border:'none', color:'#222', fontWeight:'bold', cursor:'pointer'}}>Home</button>
        )}
      </div>
      {transactions.length === 0 ? (
        <div>No hay transacciones.</div>
      ) : (
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#e2e8f0'}}>
              {Object.keys(transactions[0]).map(key => (
                <th key={key} style={{padding:'8px', border:'1px solid #cbd5e1', textAlign:'left'}}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx}>
                {Object.values(tx).map((value, i) => (
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

export default Transactions;
