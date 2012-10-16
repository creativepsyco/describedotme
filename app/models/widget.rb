class Widget < ActiveRecord::Base
  attr_accessible :creator_id, :description, :location, :name, :thumbnail

  belongs_to :creator, class_name: "User"

  has_many :users_widgets, class_name: "UsersWidgets"
  has_many :users, :through => :users_widgets
end
