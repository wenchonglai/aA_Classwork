import {connect} from 'react-redux';
import PokemonDetail from './pokemon_detail';
import {requestPokemon} from '../../actions/pokemon_actions'; 
import {selectAllPokemon, selectPokemonItems, selectPokemonMovesNames} from '../../reducers/selectors';

const MapStateToProps = (state, ownProps) => ({
  poke: selectAllPokemon(state),
  items: selectPokemonItems(state),
  moves: selectPokemonMovesNames(state)
});

const MapDispatchToProps = (dispatch) => ({
  requestPokemon: (id) => dispatch(requestPokemon(id))
});

export default connect(MapStateToProps, MapDispatchToProps)(PokemonDetail);