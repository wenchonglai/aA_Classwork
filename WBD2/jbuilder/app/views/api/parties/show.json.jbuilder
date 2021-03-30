json.partial! "party", party: @party

guests = @party.guests.includes(:gifts)

json.guests guests do |guest|
  json.name guest.name
  json.gifts guest.gifts do |gift|
    json.title gift.title
  end
end


# json.gifts do
#   json.array! @party.guests do |guest|
#     json.id guest.id
#   end
# end