class FollowNotificationData
  def self.encode(follow)
    data = {
      user_id: follow.follower_id
    }
    return JSON.generate(data)
  end

  def self.decode(data)
    return JSON.parse(data)
  end

end