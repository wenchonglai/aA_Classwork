# == Schema Information
#
# Table name: goals
#
#  id         :bigint           not null, primary key
#  title      :string
#  body       :text
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Goal < ApplicationRecord
end
