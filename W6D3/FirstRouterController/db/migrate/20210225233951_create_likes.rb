class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
        t.references :likee, polymorphic:true
        t.integer :liker_id, null:false
  
      t.timestamps
    end
    add_index :likes, [:likee_id, :liker_id, :likee_type] , unique:true
  end
end
