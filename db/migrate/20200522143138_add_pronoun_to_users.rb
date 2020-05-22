class AddPronounToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :pronoun, :string
    add_column :users, :manager, :boolean
  end
end
