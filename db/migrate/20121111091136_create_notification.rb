class CreateNotification < ActiveRecord::Migration
  def up
  	create_table :notifications do |t|
      t.integer :user_id 			#user getting the notification
      t.integer :notification_type 	#different type of notification
      t.string  :data				#json-encoded associated data object string
      								# depend on the notification type, it structure is describe in notification class
      t.timestamps
    end
    add_index :notifications, :user_id
  end

  def down
  	drop_table :notifications
  end
end
