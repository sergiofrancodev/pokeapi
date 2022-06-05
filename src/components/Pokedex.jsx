import React, { useEffect, useState } from 'react';
import '../App'
import { useSelector } from 'react-redux';
import axios from 'axios';
import PokemonCards from './PokemonCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const Pokedex = () => {


    const user = useSelector(state => state.user);
    const [pokemons, setPokemons] = useState([]);
    const [searchPokemon, setSearchPokemon] = useState("");
    const [pokemonsTable, setPokemonsTable] = useState([]);
    const [typesPokemons, setTypesPokemons] = useState([]);

    const [page, setPage] = useState(1);


    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126").then(res => {
            setPokemons(res.data.results)
            setPokemonsTable(res.data.results)
        });

        axios.get("https://pokeapi.co/api/v2/type/").then(res => {
            setTypesPokemons(res.data.results)
        });

    }, []);


    const filterTypes = e => {
        axios.get(e.target.value)
        .then(res => 
            e.target.value !== 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126' ?
            setPokemons(res.data.pokemon) : setPokemons(res.data.results))
    
    }

    const submit = e => {
        setSearchPokemon(e.target.value);
        search(e.target.value);
    }


    const search = (SearchType) => {

        const resultSearch = pokemonsTable.filter((element) => {

            if (element.name.toString().includes(SearchType.toString())) {
                return element;
            }

        })
        setPage(1)
        setPokemons(resultSearch);
    }

    const pokemonNumbers = 20;
    const lastIndex = pokemonNumbers * page;
    const fristIndex = lastIndex - pokemonNumbers;
    const pokemonPaginated = pokemons.slice(fristIndex, lastIndex);
    const lastPage = Math.ceil(pokemons?.length / pokemonNumbers);



    const numbers = [];

    for (let i = 1; i <= lastPage; i++) {
        if (i < page + 7 && i > (page - 7) + 5) {

            numbers.push(i);
        }


    }
    return (
        <div className='header'>
            <div className='header-top'>
                <div className='logo-header'><img src="https://sergiofrancodev.com/logo.png" alt="" width="500" />
                </div>
                <img src="https://sergiofrancodev.com/pokeball1.png" alt="" width="150px" />
            </div>
            <div className='header-botom'></div>

            <div className='contain-pokemons'>
                <h3>Welcome <span className='contain-user'> {user}</span><span className='welcome-text'>, Here you can find your favorite pokemon.</span></h3>
            </div>

            <div className='search-categories'>

                <div className='search-div'><input
                    type="text"
                    value={searchPokemon}
                    onChange={submit}
                    placeholder="Search pokemon" /><FontAwesomeIcon icon={faSearch} className="search-icon" />
                </div>


                <div className='filter-type-box'>

                    <select onChange={filterTypes} className="select-type">
                     <option  value={'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126'}>All pokemons</option>
                        {typesPokemons.map((type) => (

                            <option value={type.url} key={type.url}>{type.name}</option>

                        ))}
                    </select>


                </div>
            </div>



            <ul className='cards' >

                {pokemonPaginated?.map((pokemon) => (

                    <PokemonCards 
                    key={pokemon.url !== undefined ? pokemon.url : pokemon.pokemon.url}
            pokemonUrl={
              pokemon.url !== undefined ? pokemon.url : pokemon.pokemon.url
            } />

                ))}

            </ul>

            <div className='pagination-box'>
                <button
                    onClick={() => { setPage(1) }}
                    disabled={page === 1}
                    className="first-page">
                    first</button>
                <button
                    onClick={() => { setPage(page - 1) }}
                    disabled={page === 1}
                    className="button-prev"
                >
                    &laquo;</button>




                {
                    numbers.map(number => (
                        <li key={number} className={`button-pagination ${number === page ? "active" : ""}`}
                            onClick={() => { setPage(number) }}

                        >{number}</li>
                    ))
                }

                <button
                    onClick={() => { setPage(page + 1) }}
                    disabled={page === lastPage}
                    className="button-next">
                    &raquo;</button>

                <button
                    onClick={() => { setPage(lastPage) }}
                    disabled={page === lastPage}
                    className="last-page">
                    last</button>

            </div>

            <div className='footer-poke'>

                <span>Hecho con ♥ en Academlo       </span>               </div>

        </div>






    );
};

export default Pokedex;