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
FactoryBot.define do
  factory :goal do
    title { "MyString" }
    body { "MyText" }
    user_id { 1 }
  end
end
