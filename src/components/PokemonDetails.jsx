import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


const PokemonDetails = () => {



    const [pokemonSelf, setPokemonSelf] = useState([]);
    const [typesPokemon, setTypesPokemon] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [movements, setMovements] = useState([]);



    const {id} = useParams();

    useEffect(() =>{

        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => {
            setPokemonSelf(res.data)
        })

    },[id])

    useEffect(() =>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => setTypesPokemon(res.data.types))
    
     },[id])

     useEffect(() =>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => setAbilities(res.data.abilities));
    
     },[id])

     useEffect(() =>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => setMovements(res.data.moves));
    
     },[id])
    return (

        <div className='header'>
        <div className='header-top'>
            
        <div className='logo-header'><Link to="/pokedex"><img src="https://sergiofrancodev.com/logo.png" alt="" width="500"/> </Link>
</div>
            <img src="https://sergiofrancodev.com/pokeball1.png" alt="" width="150px" />
        </div>
        <div className='header-botom'></div>


        <div className='pokemon-self'>
            
            <div className={`pokeselfinfo ${pokemonSelf.types?.[0].type.name}`}>

            <img src={pokemonSelf.sprites?.other["official-artwork"].front_default} alt="" />



            </div>

            <div className={`numpoke ${pokemonSelf.types?.[0].type.name}`}> {`#${id}`} </div>


            <div className='pokeselfname'>
                <div className='vector2'></div>
                <div className={`namepokeself ${pokemonSelf.types?.[0].type.name}`}>  {pokemonSelf.name}</div>
                <div className='vector'></div>
            </div>


<div className='pokesize'>

<div>weight
    <div className='pokewh'>
{pokemonSelf.weight}
    </div>
</div>

<div>tallness
    <div className='pokewh'>
    {pokemonSelf.height}
    </div>
</div>

</div>


<div className='type-habilities'>

<div className='poketype'>Type

<ul className='box-types'>
    
{typesPokemon.map((typespok) =>(

<li className={`box-title-type ${pokemonSelf.types?.[0].type.name}1`} key={typespok.type?.name}> 


     {typespok.type?.name}
     
     
     </li> 



))}

    
    
    </ul>   



</div>



<div className='pokehanilitie'>Habilities

<ul className='box-types'>
    
{abilities.map((abilityPok) =>(

<li className="box-title-abilities" key={abilityPok.ability?.name}> 


     {abilityPok.ability?.name}
     
     
     </li> 



))}

    
    
    </ul>   
</div>
</div>

        <div className="box-stats">

<div>Stats</div>
<div className='vector3'></div>
<img src="https://sergiofrancodev.com/pokeball1.svg" alt="" />

        </div>
                    </div>
                    
                    <div className='bottom-self'>


                    <div className="movements-box">

<div>Movements</div>
<div className='vector3'></div>
<img src="https://sergiofrancodev.com/pokeball1.svg" alt="" />

        </div>

        <div className="movements-tags">
{
    movements.map((movement) =>(

        <li className={`tags-movements tag ${pokemonSelf.types?.[0].type.name}1`} key={movement.move?.name}>{movement.move?.name}</li>

    ))}


        </div>
                    </div>

                    <div className='footer-poke'>
                  <span>Hecho con ♥ en Academlo       </span>               </div>
        </div>

    );
};

export default PokemonDetails;