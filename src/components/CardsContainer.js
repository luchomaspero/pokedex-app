import Card from './Card'
import pokeapi from '../pokeapi'
import Loader from './small-components/Loader'
import {useDebouncedFetch} from '../hooks/useFetchWithCache'
import './CardsContainer.css'


export default function CardsContainer(){
    // dato no menor: este componente triggerea mas llamadas
    // y tiene un Loader propio, seguramente por eso aparecen dos
    // superpuestos, fijate si lo descomentas que va a volver a pasar
    const {data, error, loading} = useDebouncedFetch(pokeapi.searchPokemons)
    return (
        <>
        <div>
            {loading && <Loader></Loader>}
        </div>
        <div className='cards-container'>
            {
                data && data.results.map((pokemon) => (
                    <Card 
                    pokemonName={pokemon.name} 
                    key={pokemon.url}
                    ></Card>
                ))
            }
        </div>
        {/* aca probablemente tengas el mismo problema del error
        porque es un objeto, no un string (si es un string ta todo bien)
        */}
        {error && <div>{error}</div>}
        </>
    )
}
