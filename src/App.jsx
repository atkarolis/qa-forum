import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/UI/Header';
import Home from './components/Pages/Home';
import Footer from './components/UI/Footer';
import AddQuestion from './components/Pages/AddQuestion';
import Register from './components/Pages/Register';
import Login from './components/Pages/Login';

const App = () => {
  return (
    <>
    <Header />
    <Routes>
        <Route index element={<Home />}/>
        <Route path='/addQuestion' element={<AddQuestion />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
    </Routes>
    <Footer />
    </>
  );
}
 
export default App;