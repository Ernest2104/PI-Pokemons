import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import PokemonCreate from './components/PokemonCreate.jsx'
import PokemonUpdate from './components/PokemonUpdate.jsx'
import PokemonDetail from './components/PokemonDetail.jsx'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path= '/' component= {LandingPage} />
          <Route path= '/home' exact component= {Home} />
          <Route exact path='/pokemon' component={PokemonCreate} />
          <Route exact path='/pokemon/update/:id' component={PokemonUpdate} />
          <Route path='/home/:id' component={PokemonDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
