class Role < ActiveRecord::Base
  attr_accessible :role, :unique => true
  has_and_belongs_to_many :users
end
