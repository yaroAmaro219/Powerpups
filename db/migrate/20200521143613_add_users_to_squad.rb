class AddUsersToSquad < ActiveRecord::Migration[6.0]
  def change
    add_column :squads, :users, :string
  end
end
