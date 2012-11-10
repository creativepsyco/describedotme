class Attachment < ActiveRecord::Base
  # alt: alternative text content, in case we want a kind of attachment that's not a file
  # url: photo / video / file => have an url attachment
  # type: the type of the attachment (photo, video, code, etc)
  # thumbnail_url: hmm, extra, may not be necessary
  attr_accessible :alt, :attfile, :att_type, :creator_id, :description, :item_id, :thumbnail_url

  has_attached_file :attfile,
      :path => ":rails_root/public/system/:attachment/:id/:style/:filename",
      :url => "/system/:attachment/:id/:style/:filename"

  belongs_to :creator, class_name: "User"
  belongs_to :item
end
