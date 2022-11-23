import './SearchPokemon.css'
import pokeapi from '../pokeapi';
import Loader from './small-components/Loader';
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useDebouncedFetch } from '../hooks/useFetchWithCache';
import { NavLink } from 'react-router-dom';


const SearchInput = styled.input`
  border: none;
  background: none;
  border-bottom: 1px solid white;
  outline: none;
  color: white;
`;

const ResultList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`;
const ResultListItem = styled.li`
  margin-right: 1em;
  margin-bottom: 1em;
  width: 30%;
`;
const ResultItem = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Image = styled.img`
  margin-top: 1em;
  max-height: 20em;
`;

const SearchPokemon = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, loading } = useDebouncedFetch(pokeapi.getPokemonByName, searchTerm, 1000);

  // esto se puede borrar, es para que puedas ver la data cada vez que cambia
  // fijate que es null un par de veces antes de cargar
  useEffect(() => console.log(data, "pokedex data"), [data]);

  return (
    <>
    <SearchInput onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} className='textInput' placeholder='Search a Pokemon!'>
    </SearchInput>
    
    {loading && <Loader/>}
    {data && (
      <ResultList>
        {/* esto falla porque si miras en la consola, cuando no buscaste nada
        se hace una llamada vacia que devuelve una respuesta con otra estructura:
        esa estructura tiene un results adentro, pero cuando buscas el nombre de un pokemon
        fijate que no se muestra nada porque data.results va a evaluar a falsy
        */}
        {data.results && data.results.map((result) => (
          <ResultListItem key={result.id}>
            <NavLink to={`/${result.name}`}>
              <ResultItem>
                <div>{result.name}</div>
                <Image src={result.front_default} alt={result.name}></Image>
              </ResultItem>
            </NavLink>
          </ResultListItem>
        ))}
      </ResultList>
    )}
    {/* cuando triggereabas cualquier request erronea antes esto tiraba un error
    del tipo: no podes usar un objeto para renderear, necesito un react component
    y bueno, error es un objeto que adentro tiene algunas cosas, entre ellas message
    */}
    {error && <div>{error.message}</div>}
    </>
  )
}

export default SearchPokemon
