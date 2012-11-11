class ItemNotificationData
  def self.encode(item)
    data = {
      item_id: item.id,
      creator_id: item.creator.id
    }
    print "Encoded data: ", JSON.generate(data)
    return JSON.generate(data)
  end

  def self.decode(data)
    return JSON.parse(data)
  end

end