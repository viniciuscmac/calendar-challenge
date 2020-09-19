import React from 'react';
import { Container } from 'reactstrap';
import Calendar from './components/calendar/calendar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container>
        <Calendar />
      </Container>
    </div>
  );
}

export default App;
