class KudoNotificationData
  def self.encode(kudo)
    user = User.find(kudo.user_id)
    item = Item.find(kudo.item_id)
    data = {
      item_id: kudo.item_id,
      user_id: kudo.user_id,
      user_name: user.name,
      item_name: item.title,
      user_pic_url: user.photo_url
    }
    print "Encoded data: ", JSON.generate(data)
    return JSON.generate(data)
  end

  def self.decode(data)
    return JSON.parse(data)
  end

end