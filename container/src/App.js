import React from 'react';
import logo from './logo.svg';
import './App.css';

const MFLibraryApp = React.lazy(
  () => import('mfLibraryName/App')
);

const MFLibraryButton = React.lazy(
  () => import('mfLibraryName/Button')
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is the host App
        </p>
        <div style={{"border": "1px solid red"}}>
          <MFLibraryApp/>
        </div>
        <div style={{"border": "1px solid yellow"}}>
          <MFLibraryButton/>
        </div>
      </header>
    </div>
  );
}

export default App;
