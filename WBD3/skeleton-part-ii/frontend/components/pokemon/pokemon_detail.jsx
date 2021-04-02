import React from 'react';

class PokemonDetail extends React.Component{
  constructor(props){ super(props);
    this.state = {id: undefined}
  }

  componentDidMount(){
    this.props.requestPokemon(this.props.match.params.id);
    //this.setState({id: this.props.match.params.id});
  }

  componentDidUpdate(props){
    if (props.match.params.id != this.props.match.params.id){
      this.props.requestPokemon(this.props.match.params.id);
      //this.setState({id: this.props.match.params.id});
    }
  }

  render (){
    let {poke, moves, items} = this.props;
  
    const obj = {...poke, movenames: moves.join(","), items }

    console.log(obj);
    return (
      <div className='pokemon-detail'>
        <ul className='pokemon-detail'>
          { poke ? Object.keys(poke).concat(Object.keys(moves)).map((key, i) => (
              <li key={i}>{
                key === 'imageUrl' ?
                  (<figure>
                    <img src={poke[key]}/>
                  </figure>) :
                  `${key}: ${poke[key]}`
          }</li>
            )) : null
          }
        </ul>
      </div>
    );
  }
}


export default PokemonDetail;