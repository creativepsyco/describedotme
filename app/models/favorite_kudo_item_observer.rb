class FavoriteKudoItemObserver < ActiveRecord::Observer
	observe UserFavoriteItem, UserKudoItem

	require "NotificationData/favorite_notification_data"
	require "NotificationData/kudo_notification_data"
  	# FAVORITE_CREATED 
  	# KUDO_CREATED 
  def after_create(action)
  	item = Item.find_by_id(action.item_id)
  	user = item.creator

  	notification_type = Notification::FAVORITE_CREATED
  	data = ""
  	if (action.class == UserFavoriteItem)
  		notification_type = Notification::FAVORITE_CREATED
			data = FavoriteNotificationData.encode(action)
  	elsif (action.class == UserKudoItem)
  		notification_type = Notification::KUDO_CREATED
  		data = KudoNotificationData.encode(action)
  	end
		Notification.add(user, notification_type, data)
	end
end