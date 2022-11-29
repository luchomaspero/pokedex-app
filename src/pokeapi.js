const BASE_URL = 'https://pokeapi.co/api/v2'

const getResource = async (resourceURL) => {
    const response = await fetch(resourceURL)
    if(!response.ok){
        throw new Error('API Error')
    }

    return response.json()
}

const pokeapi = {
    searchPokemons: (searchTerm) =>
        getResource(`${BASE_URL}/pokemon?limit=100000&offset=0`).results, 
        getPokemonById:(id) => getResource(`${BASE_URL}/pokemon/${id}`),
}

export default pokeapi