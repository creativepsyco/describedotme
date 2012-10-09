class CreateRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.string :role
      t.timestamps
    end

    create_table :roles_users, :id => false do |t|
      t.references :role, :user
    end
  end
end
