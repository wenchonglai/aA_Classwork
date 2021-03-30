@pokemons.each do |pokemon|
  json.partial! "pokemon", pokemon: pokemon
end