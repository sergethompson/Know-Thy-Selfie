class AddCaptionToSelfies < ActiveRecord::Migration
  def change
    add_column :selfies, :caption, :string
  end
end
