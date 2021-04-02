export const selectAllPokemon = (state) => {
  return Object.values(state.entities.pokemon) 
}

export const selectPokemonMovesNames = (state) => {
  return Object.values(state.entities.moves).map((move) => move.name);
}
  
export const selectPokemonItems = (state) => {
  return Object.values(state.entities.items)
}
  