class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references :squad, null: false, foreign_key: true
      t.string :title
      t.string :description
      t.datetime :date

      t.timestamps
    end
  end
end
