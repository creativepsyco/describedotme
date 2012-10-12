class AddUniqueIndexRolesTagsCategories < ActiveRecord::Migration
  def up
  	add_index :roles, :role, :unique => true
  	add_index :tags, :name, :unique => true
  	add_index :categories, :name, :unique => true
  end

  def down
  	remove_index :roles, :role
  	remove_index :tags, :name
  	remove_index :categories, :name
  end
end
