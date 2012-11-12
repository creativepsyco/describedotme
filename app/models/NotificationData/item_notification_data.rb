class ItemNotificationData
  def self.encode(item)
    user = User.find(item.creator.id)
    item = Item.find(item.id)
    data = {
      item_id: item.id,
      item_name: item.title,
      user_id: item.creator.id,
      user_name: user.name
    }
    print "Encoded data: ", JSON.generate(data)
    return JSON.generate(data)
  end

  def self.decode(data)
    return JSON.parse(data)
  end

end