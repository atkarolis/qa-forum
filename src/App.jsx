import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/UI/Header';
import Home from './components/Pages/Home';

const App = () => {
  return (
    <>
    <Header />
    <Routes>
        <Route index element={<Home />}/>
    </Routes>
    </>
  );
}
 
export default App;