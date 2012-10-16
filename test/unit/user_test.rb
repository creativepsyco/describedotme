require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "should not save without name" do
  	user = User.new
  	assert !user.save, "User saved without name?"
  end

  test "should not save without email" do
  	user = User.new ({:name => 'Hoang', :email => 'test.@test.com'})
  	assert !user.save, "User saved without email?"
  end

	test "should not save without password" do
  	user = User.new ({:name => 'Hoang', :email => 'test.@test.com'})
  	assert !user.save, "User saved without password?"
  end


	test "should be able to create user" do
		password_digest = User.new.send(:password_digest, 'testtest')
  	user = User.new ({:name => 'Hoang', 
  		:email => 'test111@test.com', 
  		:password => 'password_digest', 
  		:password_confirmation => 'password_digest'})
  	assert user.save
  end

end
