class AddSurprisedConfidenceValueToSelfie < ActiveRecord::Migration
  def change
    add_column :selfies, :surprised, :decimal
  end
end
