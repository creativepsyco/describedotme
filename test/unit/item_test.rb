require 'test_helper'

class ItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "should not save without user" do
  	item = Item.new
  	assert !item.save, "Item can save without creator"
  end

	test "should be able to create item" do
		user = User.new ({:name => 'Hoang', 
  		:email => 'test111@test.com', 
  		:password => 'password_digest', 
  		:password_confirmation => 'password_digest'})
  	assert user.save
    item = Item.new
    item.creator = user
    assert item.save
  end

  test "user should be able to favourite item" do
    item = Item.new
    user_one = users(:one)
    item.creator = user_one
    item.save

    user_two = users(:two)
    user_two.favorite_items << item
    assert user_two.save, "User cannot favourite item"
  end

end
