import './App.css';
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <main>
        <Route index element={<Home />} />
        <Routes>
          <Route path='cards'>
            <Route path='allCards' element={<Cards />} />
          </Route>
          <Route path='/user'>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
