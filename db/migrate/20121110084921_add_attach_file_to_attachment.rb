class AddAttachFileToAttachment < ActiveRecord::Migration
  def change
    add_attachment :attachments, :attfile
  end
end
