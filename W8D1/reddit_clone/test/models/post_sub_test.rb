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
require 'test_helper'

class PostSubTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
