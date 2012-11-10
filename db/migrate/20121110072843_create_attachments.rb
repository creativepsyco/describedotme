class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.string :description
      t.string :thumbnail_url
      t.integer :creator_id
      t.string :alt
      t.integer :item_id
      t.string :att_type

      t.timestamps
    end
  end
end
