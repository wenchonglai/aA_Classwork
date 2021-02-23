# == Schema Information
#
# Table name: polls
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Poll < ApplicationRecord
  validates(:title, :user_id, {presence: true})

  belongs_to(:author, {foreign_key: :user_id, class_name: :User})
  has_many(:questions, {foreign_key: :poll_id, class_name: :Question})

  has_many(:responses, {through: :questions, source: :responses})
  has_many(:respondents, {through: :responses, source: :respondent})

  def users_completed
    Poll.joins(:respondents).where(polls: {id: id}).order("users.id").distinct.select("users.*")
  end
end
