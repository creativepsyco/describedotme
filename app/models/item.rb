class Item < ActiveRecord::Base
  attr_accessible :category, :description, :item_url, :title

  has_and_belongs_to_many :favourite_users, :class_name => "User", :through => :users_favourite_items
  has_and_belongs_to_many :kudo_users, :class_name => "User", :through => :users_kudo_items
end
