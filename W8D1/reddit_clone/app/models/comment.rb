# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  content           :string           not null
#  author_id         :integer          not null
#  post_id           :integer          not null
#  parent_comment_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Comment < ApplicationRecord

  validates :content, :author_id, :post_id, presence: true

  has_many :child_comments,
  class_name: "Comment"

  belongs_to :parent_comment,
  class_name: "Comment"

  belongs_to :ancestor_comment,
  class_name: "Comment"

  belongs_to :author

  belongs_to :post

end
