# == Schema Information
#
# Table name: shortened_urls
#
#  id         :bigint           not null, primary key
#  long_url   :text             not null
#  short_url  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
require 'securerandom'
class ShortenedUrl < ApplicationRecord
    validates :short_url, :user_id, presence: true, uniqueness:true
    
    def self.random_code
        while true
            code = SecureRandom.urlsafe_base64
            return code unless ShortenedUrl.exists?(short_url:code)

        end
        
    end

    def self.create!(user,long_url)
        instance = ShortenedUrl.new(long_url:long_url , short_url:self.random_code,user_id:user.id)
        instance.save!
    end

    belongs_to :submitter, 
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User
end
