import {connect} from 'react-redux';
import {requestAllPokemon, requestPokemon} from './../../actions/pokemon_actions';
import {selectAllPokemon} from './../../reducers/selectors';
import PokemonIndex from './pokemon_index';


const mapStateToProps = state => ({
  pokemon: selectAllPokemon(state)
})

const mapDispatchToProps = dispatch => ({
  requestAllPokemon: () => dispatch(requestAllPokemon()),
  requestPokemon: (id) => dispatch(requestPokemon(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PokemonIndex)