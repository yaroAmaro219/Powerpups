class CreateJoinTableSquadsUsers < ActiveRecord::Migration[6.0]
  def change
    create_join_table :squads, :users do |t|
      # t.index [:squad_id, :user_id]
      # t.index [:user_id, :squad_id]
    end
  end
end
