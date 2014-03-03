class AddMorConfValuesToSelfie < ActiveRecord::Migration
  def change
    add_column :selfies, :eye_closed, :decimal
    add_column :selfies, :glasses, :decimal
  end
end
