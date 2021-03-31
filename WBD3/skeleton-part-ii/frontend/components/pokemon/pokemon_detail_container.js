import {connect} from 'react-redux';
import PokemonDetail from './pokemon_detail';
import {requestPokemon} from '../../actions/pokemon_actions'; 

const MapStateToProps = (state, ownProps) => ({
  poke: state.entities.pokemon[ownProps.match.params.id]
});

const MapDispatchToProps = (dispatch) => ({
  requestPokomon: (id) => dispatch(requestPokemon(id))
});

export default connect(MapStateToProps, MapDispatchToProps)(PokemonDetail);