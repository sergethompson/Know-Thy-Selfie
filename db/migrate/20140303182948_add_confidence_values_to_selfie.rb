class AddConfidenceValuesToSelfie < ActiveRecord::Migration
  def change
    add_column :selfies, :age, :float
    add_column :selfies, :race_string, :string
    add_column :selfies, :race_conf, :float
    add_column :selfies, :confused, :float
    add_column :selfies, :calm, :float
    add_column :selfies, :angry, :float
    add_column :selfies, :happy, :float
    add_column :selfies, :sad, :float
    add_column :selfies, :roll, :float
    add_column :selfies, :pitch, :float
    add_column :selfies, :yaw, :float
    add_column :selfies, :smile, :float
    add_column :selfies, :sex, :float
  end
end
