# == Schema Information
#
# Table name: visits
#
#  id            :bigint           not null, primary key
#  user_id       :integer          not null
#  shortened_url :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Visit < ApplicationRecord
  belongs_to( :visitor,
    foreign_key: :user_id,
    class_name: :User
  )

  belongs_to( :visited_url,
    foreign_key: :url_id,
    class_name: :ShortenedUrl
  )

  def self.record_visit!(user, shortened_url)
    
    #user_id
    #shortened_url

    Visit.create!({
      user_id: user.id,
      url_id: shortened_url.id
    });

    
  end
end
