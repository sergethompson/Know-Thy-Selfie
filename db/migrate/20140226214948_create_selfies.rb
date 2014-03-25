class CreateSelfies < ActiveRecord::Migration
  def change
    create_table :selfies do |t|
      t.string :image_url
      t.string :show_url
      t.text :json_analysis
      t.integer :votes
      t.float :latitude
      t.float :longitude
      t.integer :user_id

      t.timestamps
    end
  end
end
