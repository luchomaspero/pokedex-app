import './SearchPokemon.css'
import pokeapi from '../pokeapi';
import Loader from './small-components/Loader';
import { useState } from 'react';
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
  const { data, error, loading } = useDebouncedFetch(pokeapi.getPokemonByName, searchTerm, 500);

  return (
    <>
    <SearchInput onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} className='textInput' placeholder='Search a Pokemon!'>
    </SearchInput>
    
    {loading && <Loader/>}
    {data && (
      <ResultList>
        {data.results.map((result) => (
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
    
    {error && <div>{error}</div>}
    </>
  )
}

export default SearchPokemon