require 'test_helper'

class UsersControllerTest < ActionController::TestCase
	test "should be process by user controller" do
		get :index
		assert_equal @controller, UsersController
	end 

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:users)
  end

  test "should get show" do
    get(:show, {'id' => "12"})
    assert_response :success
    assert_not_nil assigns(:user)
  end

end
