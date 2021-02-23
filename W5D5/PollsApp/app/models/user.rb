# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  username   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
  validates :username, {uniqueness: true, presence: true}
  # validate not_duplicate_response()

  has_many( :authored_polls, {foreign_key: :user_id, class_name: :Poll})
  has_many( :responses, {foreign_key: :user_id, class_name: :Response})
  has_many( :responded_polls, {through: :responses, source: :poll})

  def started_polls
    User
      .joins(:responded_polls)
      .where(id: self.id)
      .group("polls.id")
      .select("polls.*")
  end

  def completed_polls
    Question
      .left_outer_joins(:responses => :respondent)
      .joins(:poll)
      .where("responses.user_id = ? OR responses.user_id is null", self.id)
      .group("polls.id")
      .having("count(responses.user_id) = count(*)")
      .select("polls.*")
      
      # .group("poll_id")
      # .select("poll_id, count(poll_id) as total_count, count(users.id) as user_count")
  end
end
