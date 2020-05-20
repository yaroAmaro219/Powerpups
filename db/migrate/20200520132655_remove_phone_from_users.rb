class RemovePhoneFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :phone, :integer
  end
end
