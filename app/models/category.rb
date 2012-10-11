class Category < ActiveRecord::Base
  attr_accessible :name, :unique => true
  attr_accessible :description
  belongs_to :item
end
