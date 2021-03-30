guests = @guests
  .select{|guest| (40..50).cover?(guest.age) }
  
json.array! guests do |guest|
  json.partial! "guest", guest: guest
end