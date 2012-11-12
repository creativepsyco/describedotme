class FollowNotificationData
  def self.encode(follow)
  	user = User.find(follow.follower_id)
    data = {
      user_id: follow.follower_id,
      user_name: user.name,
      user_pic_url: user.photo_url 
    }
    puts data
    return JSON.generate(data)
  end

  def self.decode(data)
    return JSON.parse(data)
  end

end