class CreateUserFollow < ActiveRecord::Migration
  def up
  	create_table :user_follow_users do |t|
      t.integer :user_id 		#user being followed
      t.integer :follower_id 	#follower

      t.timestamps
    end
  end

  def down
  end
end
