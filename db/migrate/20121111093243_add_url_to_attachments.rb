class AddUrlToAttachments < ActiveRecord::Migration
  def change
    add_column :attachments, :url, :string
  end
end
