class ChangeShortenedUrlColumnShortenedUrls < ActiveRecord::Migration[5.2]
  def change
    change_column :shortened_urls, :user_id, :integer, unique: false , presence: true
  end
end
