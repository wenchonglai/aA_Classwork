# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'date'

Cat.destroy_all

cats = [ "dug", "bug", "rug", "mug", "tug", "hug", "jug", "lug", "pug", "vug", "fug",
  "drug", "plug", "smug", "slug", "snug", "thug", "chug", "glug", "trug",
  "shrug", "debug", "sprug", "almug",
  "humbug", "unplug", "bedbug", "mudbug", "redbug", "dorbug", "bedrug",
  "prodrug", "ladybug", "earplug", "billbug", "firebug", "goldbug", "tautaug", "lovebug", "antibug", "quahaug", "bearhug", "nondrug"
];

colors = ['brown', 'orange', 'white', 'black', 'ginger', 'blue', 'grey'];

cats.shuffle.each_with_index do |cat, i|
  Cat.create({
    birth_date: Date.jd(Date.today.jd - rand(5000)),
    color: colors.sample,
    name: cat,
    sex: ['M', 'F'].sample, 
    url: "http://placekitten.com/#{200 + i}/#{200 + i}",
    description: "#{Faker::Creature::Dog.meme_phrase}. Such #{Faker::Adjective.positive}. wow"
  });
end
