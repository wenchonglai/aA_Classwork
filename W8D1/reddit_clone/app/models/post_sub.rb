# == Schema Information
#
# Table name: post_subs
#
#  id         :bigint           not null, primary key
#  sub_id     :integer
#  post_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PostSub < ApplicationRecord

  validates :sub, :post, presence: true
  validates :sub_id, uniqueness: {scope: :post_id}

  belongs_to :sub
  belongs_to :post


end
