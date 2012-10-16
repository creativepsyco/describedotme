class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :content
      t.string :item_id
      t.string :creator_id

      t.timestamps
    end
  end
end
