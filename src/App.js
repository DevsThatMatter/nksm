import './App.css';
import Navbar from './Navbar.js'

function App() {
  return (
    <div className="App">
      <header className="app__body">
        <div className="app__navbar">
          <h1>Navbar goes here</h1>
          <Navbar />
        </div>
      </header>
    </div>
  );
}

export default App;
