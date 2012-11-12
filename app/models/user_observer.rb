class UserFollowUserObserver < ActiveRecord::Observer
	require "NotificationData/follow_notification_data"
  	# ITEM_CREATED
  def after_create(item)
		item.creator.followers.each do |user|
    	Notification.add(user,  Notification::ITEM_CREATED, ItemNotificationData.encode(item))
	  end
	end
end