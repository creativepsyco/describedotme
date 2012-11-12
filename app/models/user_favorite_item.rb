class UserFavoriteItem < ActiveRecord::Base
    belongs_to :favorite_user, :class_name => 'User',  :foreign_key => "user_id"
    belongs_to :favorite_item, :class_name => 'Item',  :foreign_key => "item_id"

    attr_accessible :item_id
end
