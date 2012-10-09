class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title
      t.string :description
      t.string :item_url
      t.references :category
      t.references :creator

      t.timestamps
    end

    create_table :users_favorite_items do |t|
    	t.references :user, :item
    end

    create_table :users_kudo_items do |t|
    	t.references :user, :item
    end


  end
end
