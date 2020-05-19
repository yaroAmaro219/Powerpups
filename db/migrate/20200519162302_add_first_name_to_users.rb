class AddFirstNameToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :location, :string
    add_column :users, :phone, :integer
    add_column :users, :department, :string
    add_column :users, :title, :string
  end
end
