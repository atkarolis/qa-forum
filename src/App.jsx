import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/UI/Header';
import Home from './components/Pages/Home';
import Footer from './components/UI/Footer';
import AddQuestion from './components/Pages/AddQuestion';

const App = () => {
  return (
    <>
    <Header />
    <Routes>
        <Route index element={<Home />}/>
        <Route path='/addQuestion' element={<AddQuestion />}/>
    </Routes>
    <Footer />
    </>
  );
}
 
export default App;