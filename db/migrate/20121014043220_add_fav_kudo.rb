class AddFavKudo < ActiveRecord::Migration
  def up
  	create_table :user_favorite_items do |t|
      t.integer :item_id
      t.integer :user_id # refer to user id

      t.timestamps
    end

    create_table :user_kudo_items do |t|
      t.integer :item_id
      t.integer :user_id # refer to user id

      t.timestamps
    end
  end

  def down
  end
end
