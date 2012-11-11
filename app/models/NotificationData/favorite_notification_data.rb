class FavoriteNotificationData
  def self.encode(fav)
    data = {
      item_id: fav.item_id,
      user_id: fav.user_id
    }
    print "Encoded data: ", JSON.generate(data)
    return JSON.generate(data)
  end

  def self.decode(data)
    return JSON.parse(data)
  end

end