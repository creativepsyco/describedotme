class Item < ActiveRecord::Base
  attr_accessible :description, :item_url, :title, :kudos_count

  has_one :category
  belongs_to :creator, :class_name => "User"

  has_and_belongs_to_many :tags
  has_many :photos
  has_many :comments

  has_many :users_favorite_item, :class_name => 'UserFavoriteItem'
  has_many :favorite_users, :class_name => 'User', :through => :users_favorite_item

  has_many :users_kudo_item, :class_name => 'UserKudoItem'
  has_many :kudo_users, :class_name => 'User', :through => :users_kudo_item
end
