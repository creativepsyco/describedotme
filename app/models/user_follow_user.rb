class UserFollowUser < ActiveRecord::Base
    belongs_to :user,  :foreign_key => "user_id"
    belongs_to :follower, :class_name => 'User', :foreign_key => "follow_id"
end
