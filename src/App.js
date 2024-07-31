
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:3000/ */}
          <Route path='/' element={<ListEmployeeComponent />}></Route>
          {/* http://localhost:3000/employees */}
          <Route path='/employees' element={<ListEmployeeComponent />}></Route>
          {/* Adding Employee http://localhost:3000/add-employee */}
          <Route path='/add-employee' element={<EmployeeComponent />}></Route>
          {/* Update Employee http://localhost:3000/1 */}
          <Route path='/edit-employee/:id' element={<EmployeeComponent />}></Route>
        </Routes>
        
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
