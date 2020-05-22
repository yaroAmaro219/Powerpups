class CreateMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :members do |t|
      t.references :user
      t.references :squad, null: false, foreign_key: true
      t.boolean :is_admin

      t.timestamps
    end
  end
end
