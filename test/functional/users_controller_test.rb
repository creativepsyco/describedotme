require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  include Devise::TestHelpers
	def setup
    @user = users(:one) # get user from fixture
    sign_in @user
  end

  test "user_routes" do
  	assert_routing "users", { :controller => 'users', :action => 'index' }
  	assert_routing "users/1", { :controller => 'users', :action => 'show', :id => '1' }
 	end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:users)
  end


  test "should get show" do
    get(:show, {'id' => "#{@user.id}"})
    assert_not_nil assigns(:user)
  end

end
