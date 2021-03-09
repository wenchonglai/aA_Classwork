# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  url        :string
#  content    :text
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord

  validates :title, :author_id, presence: true
  validates :url, uniqueness: true

  has_many :post_subs,
  dependent: :destroy

  has_many :subs,
  through: :post_subs,
  source: :sub

  has_many :comments

  def comments_by_parent_id
    all_comments = self.comments.includes(:author)
    h = Hash.new { |h, k| h[k] = [] }
    all_comments.each do |comment|
      h[comment.parent_comment_id] << comment
    end
    return h
  end

end
