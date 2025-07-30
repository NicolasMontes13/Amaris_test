import logo from './logo.svg';
import './App.css';
import Funds from './components/Funds';
import Transactions from './components/Transactions';
import User from './components/User';
import Subscriptions from './components/Subscriptions';
import TransactionForm from './components/TransactionForm';
import { useState } from 'react';

function App() {
  // Estado para controlar qué componente mostrar.
  // 'active' guarda el nombre del componente a mostrar. Por defecto es '' (ninguno).
  const [active, setActive] = useState('');

  // Esta función retorna el componente correspondiente según el valor de 'active'.
  // Así, solo se renderiza el componente cuando el usuario hace clic en el botón.
  // Función para volver al menú principal
  function goHome() {
    setActive('');
  }

  function renderComponent() {
    const cardStyle = { marginTop: '24px' };
    switch (active) {
      case 'funds':
        return (<div className="card" style={cardStyle}><Funds onHome={goHome} /></div>);
      case 'transactions':
        return (<div className="card" style={cardStyle}><Transactions onHome={goHome} /></div>);
      case 'user':
        return (<div className="card" style={cardStyle}><User onHome={goHome} /></div>);
      case 'subscriptions':
        return (<div className="card" style={cardStyle}><Subscriptions onHome={goHome} /></div>);
      case 'transactionForm':
        return (<div className="card" style={cardStyle}><TransactionForm onHome={goHome} /></div>);
      default:
        return (<div style={{textAlign:'center', color:'#888', marginTop:'32px'}}>Selecciona una opción para ver información</div>);
    }
  }

  // La interfaz muestra los botones y el componente seleccionado
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/*
          Botonera principal:
          Cada botón cambia el estado 'active' para mostrar el componente correspondiente.
          Así, la petición al backend solo se hace cuando el usuario lo solicita.
        */}
        <div style={{display:'flex', gap:'12px', marginBottom:'24px', flexWrap:'wrap', justifyContent:'center'}}>
          <button onClick={() => setActive('funds')}>Ver Fondos</button>
          <button onClick={() => setActive('transactions')}>Ver Transacciones</button>
          <button onClick={() => setActive('user')}>Ver Usuario</button>
          <button onClick={() => setActive('subscriptions')}>Ver Suscripciones</button>
          <button onClick={() => setActive('transactionForm')}>Nueva Transacción</button>
        </div>
        {/*
          Aquí se renderiza el componente seleccionado.
          Solo uno se muestra a la vez, dentro de una tarjeta visual.
        */}
        {renderComponent()}
      </header>
    </div>
  );
}

export default App;
