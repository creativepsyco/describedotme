class Notification < ActiveRecord::Base
  belongs_to :user
  
  attr_accessible :user, :notification_type, :data

  #alternate design: we can use a another table to hold the notification data
  #instead of using the associated data-string
  #belongs_to :notification_data, :polymorphic => true
  
  # when retriving: order by timestamp (reverse-chronological)
  default_scope :order => 'notifications.created_at DESC', :limit => 20
  
  USER_FOLLOWED				= 0 # user follows you
  ITEM_CREATED	            = 1 # followed user create new item
  COMMENT_CREATED		    = 2 # your item has new comment
  KUDO_CREATED	            = 3 # your item has new kudo
  FAVORITE_CREATED          = 4 # your item has new favorite
  
  def self.add(user, notification_type, data)
    return false if user.blank? or notification_type.blank? or data.blank?
    notification = Notification.create(:user => user, :notification_type => notification_type, :data => data)
    notification.save!
  end


  def self.batch_add(users, notification_type, data)
    return false if users.blank? or notification_type.blank? or data.blank?
    inserts = []

    # SQL INJECT???
    users.each {|user| inserts.push "('#{user.id}', '#{notification_type}', '#{data}', UTC_TIMESTAMP())" }

    sql = "INSERT INTO notifications ('user_id', 'notification_type', 'data', 'created_at') VALUES #{inserts.join(", ")}"
    ActiveRecord::Base.connection.execute sql
  end
end
