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
  	user = User.new ({:name => 'Hoang', 
  		:email => 'test111@test.com', 
  		:password => 'password_digest', 
  		:password_confirmation => 'password_digest'})
  	assert user.save
  end

  test "should be able to create user with same email" do
    user1 = users(:one)
    user = User.new ({:name => 'Hoang', 
      :email => user1.email, 
      :password => 'password_digest', 
      :password_confirmation => 'password_digest'})
    assert user.save
  end

  test "should be able to delete exist user" do
    user1 = users(:one)
    assert user1.destroy
  end


end
