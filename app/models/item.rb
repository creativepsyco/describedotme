class Item < ActiveRecord::Base
  attr_accessible :description, :item_url, :title

  has_one :category
  belongs_to :creator, :class_name => "User"

  has_and_belongs_to_many :tags
  has_many :photos
end
