import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserLogin from './components/UserLogin'
import PokemonDetails from './components/PokemonDetails';
import Pokedex from './components/Pokedex';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
 


  return (
    

    <HashRouter>

<Routes>
<Route path="/" element={<UserLogin />}/>

<Route element={<ProtectedRoutes/>}>
  <Route path="/pokedex" element={<Pokedex/>}/>
  <Route path="/pokedex/:id" element={<PokemonDetails />}/>

  </Route>

</Routes>

    </HashRouter>
    
   
    

    
  );
}

export default App;
