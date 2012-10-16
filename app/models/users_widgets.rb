class UsersWidgets < ActiveRecord::Base
  attr_accessible :config_json, :user_id, :widget_id

  belongs_to :user
  belongs_to :widget
end
