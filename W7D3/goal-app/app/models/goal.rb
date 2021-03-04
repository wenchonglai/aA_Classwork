# == Schema Information
#
# Table name: goals
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  body       :text
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Goal < ApplicationRecord
  validates :title, :user_id, {presence: true}
  validates :title, {uniqueness: {scope: :user_id}}

  belongs_to :user
end
