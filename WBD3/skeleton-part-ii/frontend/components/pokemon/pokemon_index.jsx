import React from 'react';
import PokemonIndexItem from './pokemon_index_item'
import {Link, Route} from 'react-router-dom';
import PokemonDetailContainer from './pokemon_detail_container'

class PokemonIndex extends React.Component{
  constructor(props){
  super(props)
  }
  
  componentDidMount(){
    this.props.requestAllPokemon()
  }
  
  render(){
    const pokemonItems = this.props.pokemon
      .map(poke => (
        <PokemonIndexItem
          key={poke.id}
          poke={poke}
          requestPokemon={this.props.requestPokemon}
        />
      ));

    return (
    <section className="pokedex">
      <ul>
        {pokemonItems}
      </ul>
      <Route
        path={`/pokemon/:id`}
        component={PokemonDetailContainer}
      ></Route>
    </section>
    )
  }
  }
  

  export default PokemonIndex;