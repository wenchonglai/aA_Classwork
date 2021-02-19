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
    validates :short_url, presence: true, uniqueness:true

    belongs_to(:submitter, {
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
    })

    has_many( :visits, {
      foreign_key: :url_id,
      class_name: :Visit
    })

    has_many( :visitors, 
        Proc.new{ distinct }, {
        through: :visits,
        source: :visitor
    })

    def self.random_code
        while true
            code = SecureRandom.urlsafe_base64
            return code unless ShortenedUrl.exists?(short_url:code)
        end
    end

    def self.create!(user, long_url)
        short_url = self.random_code
        instance = ShortenedUrl.new(long_url: long_url , short_url: short_url, user_id: user.id)
        p [long_url, short_url, user.id]
        instance.save!
    end

    def num_clicks
        self.visits.length
    end
    
    def num_uniques
        self.visitors.length
    end

    def num_recent_uniques
        self.visitors.where(created_at: 1.day.ago..Time.now)
    end
end
