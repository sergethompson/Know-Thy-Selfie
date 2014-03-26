class AddMorConfValuesToSelfie < ActiveRecord::Migration
  def change
    add_column :selfies, :eye_closed, :float
    add_column :selfies, :glasses, :float
  end
end
