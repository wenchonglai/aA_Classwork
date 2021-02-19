# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  email      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
    validates :email, presence: true, uniqueness:true

    has_many(:submitter_urls, {
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :ShortenedUrl
    })

    has_many(:visited_urls, Proc.new{distinct}, {
      foreign_key: :user_id,
      class_name: :Visit
    })

end
