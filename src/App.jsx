import './App.css';
import { Routes, Route } from 'react-router-dom'
import Cards from './components/pages/Cards';
import Header from './components/UI/Header';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Footer from './components/UI/Footer';
import Login from './components/pages/Login';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
        <Route index element={<Home />} />
          <Route path='cards'>
            <Route path='allCards' element={<Cards />} />
          </Route>
          <Route path='/user'>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
