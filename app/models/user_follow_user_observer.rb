class UserFollowUserObserver < ActiveRecord::Observer
	require "NotificationData/follow_notification_data"
  	# USER_FOLLOWED	
  def after_create(follow)
  	user = User.find_by_id(follow.user_id)
		Notification.add(user, Notification::USER_FOLLOWED, FollowNotificationData.encode(follow))
	end
end