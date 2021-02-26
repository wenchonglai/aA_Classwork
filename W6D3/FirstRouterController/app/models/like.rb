# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  likee_type :string
#  likee_id   :bigint
#  liker_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
    belongs_to :liker,
        foreign_key: :liker_id,
        class_name: :User 

    belongs_to :likee,
        polymorphic: true

end
