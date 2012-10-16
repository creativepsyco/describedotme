class Comment < ActiveRecord::Base
  attr_accessible :content, :creator_id, :item_id

  belongs_to :item, :class_name => "Item"
  belongs_to :creator, :class_name => "User"
end
