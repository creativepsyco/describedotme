class AddPhotoAndTagModel < ActiveRecord::Migration
  def change
  	remove_column :items, :item_url

  	create_table :photos do |t|
      t.string :caption
      t.string :descriptin
      t.string :photo_url
	    t.references :item

      t.timestamps
    end

    create_table :tags do |t|
      t.string :name
      t.string :description
    end

  end
end
