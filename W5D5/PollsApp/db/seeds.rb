# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

2.times { User.create!({username: Faker::Name.name}) }

food_poll = Poll.create!({title: 'Food Ratings', user_id: 1});

10.times do
  question = Question.create!({
    poll_id: food_poll.id,
    text: "Please rate the #{Faker::Food.dish} from #{Faker::Restaurant.name}"
  })

  (1..5).each do |i|
    answer_choice = AnswerChoice.create!({
      question_id: question.id,
      text: "#{i}-star"
    })
  end
end

soccer_poll = Poll.create!({ title: 'Favorite Soccer Team', user_id: 2 })

teams = 15.times.map {Faker::Sports::Football.team}.uniq
teams.each do |team|
  
  question = Question.create!({
    poll_id: soccer_poll.id,
    text: "What is your attitude towards #{team}"
  })

  ['Like', 'Dislike', 'Indifferent'].each do |text|
    answer_choice = AnswerChoice.create!({
      question_id: question.id,
      text: text
    })
  end
end

team_len = teams.length

98.times do
  user = User.create!({username: Faker::Name.name})

  next if rand(-2..4) < 0

  (1..10).each do |i|
    Response.create({
      user_id: user.id,
      answer_choice_id: rand(i * 5 - 4 .. i * 5 - 1)
    })
  end

  next if rand(-2..4) < 0

  (1..rand(team_len - 2..team_len)).each_with_index do |i|
    Response.create({ 
      user_id: user.id,
      answer_choice_id: rand(50 + i * 3 - 2 .. 50 + i * 3)
    })
  end
end