import React from 'react';
import { Container } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from './components/calendar/calendar';
import './App.css';

function App() {
  const containerStyle = {
    zIndex: 999999,
  };

  return (
    <div className="App">
      <Container>
        <ToastContainer position="top-center" autoClose={5000} style={containerStyle} />
        <Calendar />
      </Container>
    </div>
  );
}

export default App;
