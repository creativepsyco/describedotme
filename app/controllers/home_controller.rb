class HomeController < ApplicationController
  def index
  	@users = User.all
  end

  def profile
  end

  def show
  end
end
