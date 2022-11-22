import './App.css';
import { CacheProvider } from './CacheContext';
import styled from 'styled-components'
import Pokemon from './components/Pokemon'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import CardsContainer from './components/CardsContainer';
import SearchPokemon from './components/SearchPokemon';

const Wrapper = styled.div`
  min-height: 100vh;
  background: #222331;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  background: #262154;
  display: flex;
  padding: 1em;
  box-sizing: border-box;
`;

const Link = styled(NavLink)`
  background: none;
  border: none;
  border-radius: 1em;
  outline: none;
  color: white;
  padding: 0.5em;
  text-decoration: none;
  &:hover {
    background: #1f1b43;
  }
`;

const Layout = styled.div`
  padding: 2em;
  flex-direction: column;
  align-items: center;
`;


function App() {
  return (
    <Wrapper>
      <CacheProvider>
        <Router>
          <Header>
            <Link to="/">Home</Link>
          </Header>
          <Layout>
            <Switch>
              <Route path="/" exact>
                <SearchPokemon/>
                <CardsContainer/>
              </Route>
              <Route path="/:name">
                <Pokemon/>
              </Route>
            </Switch>
          </Layout>
        </Router>
      </CacheProvider>
    </Wrapper>
  );
}


export default App;
