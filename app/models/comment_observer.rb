class CommentObserver < ActiveRecord::Observer
  #COMMENT CREATED
  require "NotificationData/comment_notification_data"
  def after_create(comment)
		comment.creator.followers.each do |user|
    	Notification.add(user, Notification::COMMENT_CREATED, CommentNotificationData.encode(comment))
	  end
	end
end