class CommentNotificationData
  def self.encode(comment)
    data = {
      comment_id: comment.id,
      user_id: comment.creator.id,
      item_id:    comment.item.id
    }
    return JSON.generate(data)
  end

  def self.decode(data)
    return JSON.parse(data)
  end

end