class Tag < ActiveRecord::Base
  attr_accessible :name, :unique => true
  attr_accessible :description
  has_and_belongs_to_many :items
end
