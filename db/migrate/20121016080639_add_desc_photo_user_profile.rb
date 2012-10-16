class AddDescPhotoUserProfile < ActiveRecord::Migration
  def up
  	add_column :users, :photo_url, :string
   	add_column :users, :description, :string
  end

  def down
  	remove_column :users, :photo_url
   	remove_column :users, :description
  end
end
