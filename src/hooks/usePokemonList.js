import axios from "axios";
import { useEffect, useState } from "react";
// axios is like fetch api
function usePokemonList(type){

    // const [pokemonList,setPokemonList]=useState([]);
    // const[isLoading,setIsLoading]=useState(true);
    // const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');
    // const [nextUrl,setNextUrl]=useState('');
    // const [prevUrl,setPrevUrl]=useState('');

    // clean way to handle many states
    const [pokemonListState,setPokemonListState]=useState({
        pokemonList:[],
        isLoading : true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
        nextUrl : '',
        prevUrl : '',
    });

    async function downloadPokemons(){
        
            setPokemonListState((state)=>({...state, isLoading : true})); // overwriting isLoading
            const response =await axios.get(pokemonListState.pokedexUrl); // this downloads list of 20 pokemons
            const pokemonResults=response.data.results; // we get the array of pokemons from result

            console.log(response.data); // have next and previous 
            // setNextUrl(response.data.next);
            // setPrevUrl(response.data.previous);

            // be very carefull here we use function to set state
            setPokemonListState((state)=>({
                ...state,
                nextUrl:response.data.next,
                prevUrl:response.data.previous
            }));

            // iterating over the array of pokemons and using their url to create array of promises
            // that will download those 20 pokemons
        
            const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));

            // passing that promise array to axios.all()
            const pokemonData=await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
        
            console.log(pokemonData);
            
            // now iterate on the detailed data of each pokemon and extract id,name,type
            const pokeListResult=(pokemonData.map((pokeData) => {
                const pokemon=pokeData.data;
                return {
                    id:pokemon.id,
                    name:pokemon.name,
                    image : pokemon.sprites.other.dream_world.front_default,
                    types:pokemon.types
                };
            }))

            console.log(pokeListResult);
            // setPokemonList(pokeListResult);
            // setIsLoading(false);
            setPokemonListState((state)=>({
                ...state ,
                pokemonList:pokeListResult,
                isLoading : false
            }));
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl]); 
    // whenever pokemon url changes download respective pokemons

    return [pokemonListState,setPokemonListState];
}

export default usePokemonList;