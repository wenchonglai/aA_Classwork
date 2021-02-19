class CreateShortenedUrls < ActiveRecord::Migration[5.2]
  def change
    create_table :shortened_urls do |t|
        t.text :long_url, null: false,unique: true
        t.string :short_url, null: false
      t.timestamps
    end
    add_index :shortened_urls, :long_url
    add_index :shortened_urls, :short_url
  end
end
