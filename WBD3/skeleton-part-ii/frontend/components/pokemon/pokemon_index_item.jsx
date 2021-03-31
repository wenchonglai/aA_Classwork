import React from 'react';
import {Link, Route} from 'react-router-dom';

const PokemonIndexItem = ({poke, requestPokemon}) => {
  // const handleClick = (e) => {
  //   // e.preventDefault();
  //   requestPokemon(poke.id);
  // };

  return (
    <li className="pokemon-index-item">
      <Link to={`/pokemon/${poke.id}`}>
        <span>{poke.id}</span>
        <img src={poke.imageUrl}/>
        <span>{poke.name}</span>
      </Link>
    </li>
  )
}

export default PokemonIndexItem