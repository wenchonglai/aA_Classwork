#  id          :integer      not null, primary key
#  movie_id    :integer      not null
#  actor_id    :integer      not null
#  ord         :integer
class Casting < ApplicationRecord
  belongs_to :actor,
    class_name: :Actor,
    foreign_key: :actor_id,
    primary_key: :id

  belongs_to :movie,
    class_name: :Movie,
    foreign_key: :movie_id,
    primary_key: :id

end
