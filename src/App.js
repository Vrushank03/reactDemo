import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import Login from './components/login';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* <div className = "container mx-auto text-center fs-1 bg-dark text-light p-2 m-2 rounded shadow">
        React Crud Operations
      </div> */}
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/create' element={<Create />} />
        <Route exact path='/' element={<Read />} />
        <Route exact path='/update/:id' element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;