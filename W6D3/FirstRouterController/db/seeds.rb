# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#users
artists_data = 10.times.map{|_| Faker::Artist.name}.uniq
viewers_data = 50.times.map{|_| "#{Faker::Name.name.split(/[\ \,\-\;\.\'\"]/).join('')}@gmail.com"}.uniq
artwork_data = 40.times.map{|_| "#{Faker::Dessert.flavor} #{Faker::Dessert.variety}" }.uniq

artists_data.each do |datum|
  User.create(username: datum)
end

viewers_data.each do |datum|
  User.create(username: datum)
end

artwork_data.each do |datum|
  artwork = Artwork.create(title: datum, image_url: "picasa.com/#{datum}.png", artist_id: rand(0...artists_data.length))
  
  (0...viewers_data.length)
    .to_a.shuffle[0...rand(0...viewers_data.length)]
    .each do |viewer_id|
      ArtworkShare.create(artwork_id: artwork.id, viewer_id: viewer_id)
    end

end


#artwork
#artwork_share