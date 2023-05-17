import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/UI/Header';
import Home from './components/Pages/Home';
import Footer from './components/UI/Footer';

const App = () => {
  return (
    <>
    <Header />
    <Routes>
        <Route index element={<Home />}/>
    </Routes>
    <Footer />
    </>
  );
}
 
export default App;