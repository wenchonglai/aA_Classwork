import React from 'react';

class PokemonDetail extends React.Component{
  constructor(props){ super(props);
    this.state = {}
  }
  componentDidMount(){
    this.props.requestPokomon(this.props.match.params.id);
  }
  componentDidUpdate(){
    this.props.requestPokomon(this.props.match.params.id);
  }
  render (){
    let {poke} = this.props;
  
    return (
      <div className='pokemon-detail'>
        <ul className='pokemon-detail'>
          { poke ? Object.keys(poke).map((key, i) => (
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