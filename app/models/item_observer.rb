class ItemObserver < ActiveRecord::Observer
  	require "NotificationData/item_notification_data"
  	# ITEM_CREATED
  	def after_save(item)
		print "OBSERVER HEREEEEEEEEEEEEEEEEE"
		item.creator.followers.each do |user|
    		Notification.add(user,  Notification::ITEM_CREATED, ItemNotificationData.encode(item))
	    end
	end
end