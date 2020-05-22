class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :post
      t.references :user, null: false, foreign_key: true
      t.references :squad, null: false, foreign_key: true

      t.timestamps
    end
  end
end
