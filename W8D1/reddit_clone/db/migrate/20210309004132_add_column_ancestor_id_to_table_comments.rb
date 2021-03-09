class AddColumnAncestorIdToTableComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :ancestor_id, :integer, null: false
    add_index :comments, :ancestor_id
  end
end
