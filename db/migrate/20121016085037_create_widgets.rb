class CreateWidgets < ActiveRecord::Migration
  def change
    create_table :widgets do |t|
      t.integer :creator_id
      t.string :description
      t.string :location
      t.string :name
      t.string :thumbnail

      t.timestamps
    end
  end
end
