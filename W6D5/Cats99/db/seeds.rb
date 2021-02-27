# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'date'
Cat.create({birth_date: Date.new(1980, 1, 1), color: 'brown', name: 'Jug', sex: 'M', description: 'random cat'})
Cat.create({birth_date: Date.new(1880, 1, 1), color: 'grey', name: 'Mug', sex: 'F', description: 'random cat 2'})