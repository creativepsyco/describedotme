class Photo < ActiveRecord::Base
  attr_accessible :caption, :description, :photo_url
  belongs_to	:item
end
