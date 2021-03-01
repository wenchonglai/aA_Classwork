class CreateCatRentalRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :cat_rental_requests do |t|
      t.integer :name, {null: false}
      t.integer :cat_id, {null: false}
      t.date :start_date, {null: false}
      t.date :end_date, {null: false}
      t.string :status, {null: false, default: 'PENDING'}
      t.timestamps
    end

    add_index :cat_rental_requests, :name
    add_index :cat_rental_requests, :cat_id
    add_index :cat_rental_requests, [:name, :cat_id, :start_date], {uniqueness: true}
  end
end
