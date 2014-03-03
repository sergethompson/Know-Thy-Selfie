class AddConfidenceValuesToSelfie < ActiveRecord::Migration
  def change
    add_column :selfies, :age, :decimal
    add_column :selfies, :race_string, :string
    add_column :selfies, :race_conf, :decimal
    add_column :selfies, :confused, :decimal
    add_column :selfies, :calm, :decimal
    add_column :selfies, :angry, :decimal
    add_column :selfies, :happy, :decimal
    add_column :selfies, :sad, :decimal
    add_column :selfies, :roll, :decimal
    add_column :selfies, :pitch, :decimal
    add_column :selfies, :yaw, :decimal
    add_column :selfies, :smile, :decimal
    add_column :selfies, :sex, :decimal
  end
end
