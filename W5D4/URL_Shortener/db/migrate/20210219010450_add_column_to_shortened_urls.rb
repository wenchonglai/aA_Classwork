class AddColumnToShortenedUrls < ActiveRecord::Migration[5.2]
  def change
    add_column :shortened_urls, :user_id, :integer, unique: true , presence: true
    add_index :shortened_urls, :user_id
  end
end
