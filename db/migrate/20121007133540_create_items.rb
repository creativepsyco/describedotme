class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title
      t.string :description
      t.string :item_url
      t.references :category
      t.integer :creator_id # refer to user id

      t.timestamps
    end

    create_table :categories do |t|
      t.string :name
      t.string :description
    end

  end
end
