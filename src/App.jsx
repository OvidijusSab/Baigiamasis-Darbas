import './App.css';
import { Routes, Route,Navigate} from "react-router-dom"
import Cards from './components/pages/Cards';
import Header from './components/UI/Header';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Footer from './components/UI/Footer';
import Login from './components/pages/Login';
import AddNewCard from './components/pages/AddNewCard';
import { useContext } from 'react';
import UsersContext from './components/contexts/UsersContext';


const App = () => {

  const {loggedInUser} = useContext(UsersContext) 

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/cards'>
            <Route path='allCards' element={<Cards />} />
            <Route path='addNew' element={
              loggedInUser ? <AddNewCard /> : <Navigate to="/user/login" />
          } />
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
