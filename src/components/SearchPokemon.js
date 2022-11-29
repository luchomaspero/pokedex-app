import './SearchPokemon.css'
import pokeapi from '../pokeapi';
import Loader from './small-components/Loader';
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useDebouncedFetch } from '../hooks/useFetchWithCache';
import { NavLink } from 'react-router-dom';
import Card from './Card'



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
align-items: center;
justify-content: center;
border: 2px solid rgb(80, 80, 80);
background-color: #313131;
color: white;
text-decoration: none;
font-size: 1.35rem;
/* padding: .15rem; */
border-radius: 8px;
cursor: pointer;
height: 100px;
`;
const Image = styled.img`
  margin-top: 1em;
  max-height: 20em;
`;

const SearchPokemon = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, loading } = useDebouncedFetch(pokeapi.getPokemonById, searchTerm, 1000);
  
  
  // esto se puede borrar, es para que puedas ver la data cada vez que cambia
  // fijate que es null un par de veces antes de cargar
  useEffect(() => console.log(data, "pokedex data"), [data]);

  return (
    <>
    <SearchInput onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} className='textInput' placeholder='Search a Pokemon!'></SearchInput>
    
    {loading && <Loader/>}
    {data && (
      <ResultList>
        {data.results && data.results.map((result) => (
          <ResultListItem key={result.id}>
            <NavLink to={`/pokemon/${result.id}`}>
                <Card 
                pokemonName={result.name} 
                key={result.url}
                ></Card>
            </NavLink>
          </ResultListItem>
        ))}
      </ResultList>
    )}
    
    {error && <div>{error.message}</div>}
    </>
  )
}

export default SearchPokemon