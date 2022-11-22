const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

const getResource = async (resourceURL) => {
    const response = await fetch(resourceURL)
    if(!response.ok){
        throw new Error('API Error')
    }

    return response.json()
}

const pokeapi = {
    searchPokemons: (searchTerm) =>
        getResource(`${BASE_URL}?limit=100000&offset=0`), 
        getPokemonByName:(name) => getResource(`${BASE_URL}/${name}`),
}

export default pokeapi