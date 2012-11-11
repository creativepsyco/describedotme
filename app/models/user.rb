class User < ActiveRecord::Base

  before_create :set_default_role
  before_save :default_values
  
  def default_values
    self.photo_url ||= 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    self.description ||= ''
  end

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me, :photo_url, :description, :theme

  # attr_accessible :title, :body
  validates :name, presence: true
  VALID_EMAIL_REGEX = /\A[A-Z0-9._%+\-]+@(?:[A-Z0-9\-]+\.)+[A-Z]{2,6}\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }

  has_and_belongs_to_many :roles
  has_many :items, :foreign_key => "creator_id"

  has_many :user_favorite_items, :class_name => 'UserFavoriteItem'
  has_many :favorite_items, :class_name => 'Item', :through => :user_favorite_items

  has_many :user_kudo_items, :class_name => 'UserKudoItem'
  has_many :kudo_items, :class_name => 'Item', :through => :user_kudo_items

  has_many :users_widgets, :class_name => "UsersWidgets"
  has_many :enabled_widgets, :class_name => "Widget", :through => :users_widgets, :source => :widget

  # Follower relationship
  has_many :follows, :class_name => 'UserFollowUser'
  has_many :followers, :through => :follows

  has_many :followings, :class_name => 'UserFollowUser', :foreign_key => 'follower_id'
  has_many :following_users, :through => :followings, :source => :user

  def has_role? (role)
    return !!self.roles.find_by_role(role.to_s)
  end


  private
  def set_default_role
    self.roles << Role.find_by_role('normal')
  end

end
