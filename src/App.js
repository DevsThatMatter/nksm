import './App.css';
import Navbar from './Navbar.js'
import Register from './Register.js'

function App() {
  return (
    <div className="App">
      <header className="app__body">
        <div className="app__navbar">
          <Navbar />
        </div>

        <div className="app__register">
          <Register />
        </div>
      </header>
    </div>
  );
}

export default App;




