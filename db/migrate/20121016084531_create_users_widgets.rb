class CreateUsersWidgets < ActiveRecord::Migration
  def change
    create_table :users_widgets do |t|
      t.integer :user_id
      t.integer :widget_id
      t.string :config_json

      t.timestamps
    end
  end
end
