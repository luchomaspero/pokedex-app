import Card from './Card'
import pokeapi from '../pokeapi'
import Loader from './small-components/Loader'
import {useDebouncedFetch} from '../hooks/useFetchWithCache'
import './CardsContainer.css'


export default function CardsContainer(){
    const {data, error, loading} = useDebouncedFetch(pokeapi.searchPokemons)
    return (
        <>
        <div>
            {loading && <Loader></Loader>}
        </div>
        <div className='cards-container'>
            {data && data.results.map((pokemon) => (
                <Card 
                pokemonName={pokemon.name} 
                key={pokemon.url}
                ></Card>
                ))
            }
        </div>
        {error && <div>{error}</div>}
        </>
    )
}
