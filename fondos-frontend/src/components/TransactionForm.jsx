
import React, { useState, useEffect } from 'react';
import api from '../api';

function TransactionForm({ onHome }) {
  const [fundId, setFundId] = useState('');
  const [action, setAction] = useState('-');
  const [notificationMethod, setNotificationMethod] = useState('-');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [userBalance, setUserBalance] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  // Al montar el componente, obtener el balance del usuario
  useEffect(() => {
    setUserLoading(true);
    api.get('/user')
      .then(res => {
        setUserBalance(res.data?.balance ?? null);
        setUserError(null);
      })
      .catch(err => {
        setUserError('No se pudo obtener el balance del usuario');
        setUserBalance(null);
      })
      .finally(() => setUserLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setFormError('');
    // Validación: no permitir enviar si alguna opción es '-'
    if (action === '-' || notificationMethod === '-') {
      setFormError('Por favor selecciona una acción y un método de notificación.');
      return;
    }
    setLoading(true);
    api.post('/transaction', {
      fund_id: fundId,
      action,
      notification_method: notificationMethod
    })
      .then(response => {
        setResult(response.data);
        setError(null);
      })
      .catch(error => {
        setError(error.response?.data?.detail || 'Error en la transacción');
        setResult(null);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{margin:0}}>Realizar Transacción</h2>
        {onHome && (
          <button onClick={onHome} style={{padding:'6px 14px', borderRadius:'6px', background:'#e2e8f0', border:'none', color:'#222', fontWeight:'bold', cursor:'pointer'}}>Home</button>
        )}
      </div>
      <div style={{marginBottom:'16px'}}>
        {userLoading ? (
          <span style={{color:'#888'}}>Cargando balance...</span>
        ) : userError ? (
          <span style={{color:'red'}}>{userError}</span>
        ) : (
          <span style={{color:'#2563eb', fontWeight:'bold'}}>Balance actual: ${userBalance}</span>
        )}
      </div>
      <form onSubmit={handleSubmit} style={{
        display:'flex', flexDirection:'column', gap:'16px', maxWidth:'350px', margin:'0 auto', background:'#f8fafc', padding:'24px', borderRadius:'10px', boxShadow:'0 2px 8px #e2e8f0'}}>
        <div style={{display:'flex', flexDirection:'column'}}>
          <label htmlFor="fund_id" style={{marginBottom:'4px'}}>ID del fondo:</label>
          <input id="fund_id" type="text" placeholder="ID del fondo" value={fundId} onChange={e => setFundId(e.target.value)} required style={{padding:'8px', borderRadius:'4px', border:'1px solid #cbd5e1'}} />
        </div>
        <div style={{display:'flex', flexDirection:'column'}}>
          <label htmlFor="action" style={{marginBottom:'4px'}}>Acción:</label>
          <select id="action" value={action} onChange={e => setAction(e.target.value)} style={{padding:'8px', borderRadius:'4px', border:'1px solid #cbd5e1'}}>
            <option value="-">-</option>
            <option value="subscribe">Suscribir</option>
            <option value="cancel">Cancelar</option>
          </select>
        </div>
        <div style={{display:'flex', flexDirection:'column'}}>
          <label htmlFor="notification_method" style={{marginBottom:'4px'}}>Notificación:</label>
          <select id="notification_method" value={notificationMethod} onChange={e => setNotificationMethod(e.target.value)} style={{padding:'8px', borderRadius:'4px', border:'1px solid #cbd5e1'}}>
            <option value="-">-</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </div>
        <button type="submit" disabled={loading} style={{padding:'10px', borderRadius:'6px', background:'#2563eb', color:'#fff', border:'none', fontWeight:'bold', cursor: loading ? 'not-allowed' : 'pointer'}}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
        {formError && (
          <div style={{color:'red', marginTop:'8px', background:'#fee2e2', padding:'8px', borderRadius:'6px'}}>
            {formError}
          </div>
        )}
      </form>
      {result && (
        <div style={{color:'green', marginTop:'16px', background:'#e0fce0', padding:'12px', borderRadius:'6px'}}>
          <strong>Éxito:</strong>
          <ul style={{listStyle:'none', padding:0, margin:0}}>
            {Object.entries(result).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {String(value)}</li>
            ))}
          </ul>
        </div>
      )}
      {error && (
        <div style={{color:'red', marginTop:'16px', background:'#fee2e2', padding:'12px', borderRadius:'6px'}}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

export default TransactionForm;
