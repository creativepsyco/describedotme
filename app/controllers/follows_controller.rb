class FollowsController < ApplicationController
  before_filter :get_user, :only => [:create, :destroy, :follower_index, :following_index, :is_follow]
  before_filter :user_signed_in?, :only => [:create, :destroy, :follower_index, :following_index, :is_follow]


  def convert_to_list_id(list_user)
    return list_user
    result = Array.new
    list_user.each {|user| result.push(user.id)}
    result
  end
  # Make the current item object available to views
  #----------------------------------------
  def get_user
    @current_user = current_user
  end

  def index
    # if user id exist => list all followers for that user

    @user = User.find_by_id(params[:user_id])

    if @user
      respond_to do |format|
        format.json { render :json => { :followers => convert_to_list_id(@user.followers)} }
        format.xml  { render text: "Unsupported Format", status: 404 }
        format.html { render text: "Unsupported Format", status: 404 }
      end
    else 
      respond_to do |format|
        format.all { render :json => { :error => "User not found" }, :status => :unprocessable_entity } # placeholder
      end
    end
  end

  def create
    # i am the follower
    @user = User.find_by_id(params[:user_id])
    if !@user 
      respond_to do |format|
        format.all { render :json => { :error => "User not found" }, :status => :unprocessable_entity } # placeholder
      end
      return
    end

    if @current_user.id == @user.id 
      respond_to do |format|
        format.all { render :json => { :error => "You cannot follow yourself" }, :status => :unprocessable_entity } # placeholder
      end
      return
    end

    if @current_user.following_users.include? @user
      respond_to do |format|
        format.all { render :json => { :status => 'OK' }, :status => :unprocessable_entity } # placeholder
      end
      return
    end

    @follow = @current_user.followings.build()
    @follow.user = @user
    if @follow.save
      respond_to do |format|
        format.json { render :json => { :status => 'OK' }, :status => 200 }
        format.xml  { head :ok }
        format.html { redirect_to :action => :index }
      end
    else
      respond_to do |format|
        format.json { render :json => { :error => "Could not create this relationship" }, :status => :unprocessable_entity } # placeholder
        format.xml  { head :ok }
        format.html { render :action => :new, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
     # i am the follower
    @user = User.find_by_id(params[:user_id])
    if !@user 
      respond_to do |format|
        format.all { render :json => { :error => "User not found" }, :status => :unprocessable_entity } # placeholder
      end
      return
    end

    @follow = @current_user.followings.find_by_user_id(params[:user_id])
    if !@follow
      respond_to do |format|
        format.all { render :json => { :error => 'You are not following this user' }, :status => :unprocessable_entity } # placeholder
      end
      return
    end

    if @follow.destroy
      respond_to do |format|
        format.all { render :json => {:result => :ok}, :status => 200 }
      end
    else
      respond_to do |format|
        format.all { render :text => "Could not delete follow relation", :status => :unprocessable_entity } # placeholder
      end
    end

  end

  def follower_index
    respond_to do |format|
      format.json { render :json => { :followers => convert_to_list_id(@current_user.followers)}}
      format.xml  { render text: "Unsupported Format", status: 404 }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  def following_index
    respond_to do |format|
      format.json { render :json => { :followings => convert_to_list_id(@current_user.following_users)}}
      format.xml  { render text: "Unsupported Format", status: 404 }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  def is_follow
     # i am the follower
    @user = User.find_by_id(params[:user_id])
    if !@user 
      respond_to do |format|
        format.all { render :json => { :error => "User not found" }, :status => :unprocessable_entity } # placeholder
      end
      return
    end
    if @current_user.following_users.include? @user
      respond_to do |format|
        format.all { render :json => { :result => "true" }, :status => :unprocessable_entity } # placeholder
      end
    else 
      respond_to do |format|
        format.all { render :json => { :result => "false" }, :status => :unprocessable_entity } # placeholder
      end
    end
  end

end
