# == Schema Information
#
# Table name: responses
#
#  id               :bigint           not null, primary key
#  user_id          :integer          not null
#  answer_choice_id :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Response < ApplicationRecord
  validates(:user_id, :answer_choice_id, {presence: true})
  validate(:not_duplicate_response, :not_self_answer)

  belongs_to( :answer_choice, {foreign_key: :answer_choice_id, class_name: :AnswerChoice})
  belongs_to( :respondent, {foreign_key: :user_id, class_name: :User})
  has_one(:question, {through: :answer_choice, source: :question})
  has_one(:poll, {through: :question, source: :poll})

  def sibling_responses
    self.question.responses.where.not(id: self.id)
  end

  
  def respondent_already_answered?
    self.sibling_responses.where(user_id: self.user_id).count.positive?
  end

  private 
  def not_duplicate_response
    if self.respondent_already_answered?
      errors[:base] << "User #{self.respondent.username} Already Answered question \"#{self.question.text}\"!"
    end
  end

  def not_self_answer
    if self.user_id == self.poll.user_id
      errors[:base] << "The author cannot respond to the poll it created."
    end
  end
end
