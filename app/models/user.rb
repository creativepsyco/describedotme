class User < ActiveRecord::Base

  before_create :set_default_role

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me

  # attr_accessible :title, :body
  validates :name, presence: true
  VALID_EMAIL_REGEX = /\A[A-Z0-9._%+\-]+@(?:[A-Z0-9\-]+\.)+[A-Z]{2,6}\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }

  has_and_belongs_to_many :roles
  has_many :items, :foreign_key => "creator_id"

  def has_role? (role)
    return !!self.roles.find_by_role(role.to_s)
  end


  private
  def set_default_role
    self.roles << Role.find_by_role('normal')
  end

end
