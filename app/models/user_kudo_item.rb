class UserKudoItem < ActiveRecord::Base
    belongs_to :kudo_user, :class_name => 'User',  :foreign_key => "user_id"
    belongs_to :kudo_item, :class_name => 'Item',  :foreign_key => "item_id"

    attr_accessible :item_id
end
