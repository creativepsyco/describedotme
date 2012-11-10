class UsersController < ApplicationController
  before_filter :get_user, :only => [:index,:new,:edit, :profile]
  before_filter :accessible_roles, :only => [:new, :edit, :show, :update, :create,:profile]
  load_and_authorize_resource :only => [:show,:new,:destroy,:edit,:update]

  # Get roles accessible by the current user
  #----------------------------------------------------
  def accessible_roles
    @accessible_roles = Role.accessible_by(current_ability, :read)
  end

  # Make the current user object available to views
  #----------------------------------------
  def get_user
    @current_user = current_user
  end


  # GET /users
  # GET /users.xml
  # GET /users.json                                       HTML and AJAX
  #-----------------------------------------------------------------------
  def index
    @users = User.accessible_by(current_ability, :index).limit(20)
    respond_to do |format|
      format.json { render :json => @users }
      format.xml  { render :xml => @users }
      format.html
    end
  end

  # GET /users/new
  # GET /users/new.xml
  # GET /users/new.json                                    HTML AND AJAX
  #-------------------------------------------------------------------
#  def new
#    respond_to do |format|
#      format.json { render :json => @user }
#      format.xml  { render :xml => @user }
#      format.html
#    end
#  end

  # GET /users/1
  # GET /users/1.xml
  # GET /users/1.json                                     HTML AND AJAX
  #-------------------------------------------------------------------
  def show
    if (!params[:id])
      @user = current_user
    elsif
      @user = User.find(params[:id])
    end
    respond_to do |format|
      format.json { render :json => @user }
      format.xml  { render :xml => @user }
      format.html
    end
  end

  # GET /users/profile
  # GET /users/profile.xml
  # GET /users/profile.json                                     HTML AND AJAX
  #-------------------------------------------------------------------
  def profile
    if (!@current_user)
      respond_to do |format|
        format.json { render :json => {:error => "User not logged in"}, :status => 200}
        format.html { redirect_to root_url }
      end
    elsif
      @user = @current_user
      respond_to do |format|
        format.json { render :json => @user }
        format.xml  { render :xml => @user }
        format.html
      end
    end
  end

  # GET /users/1/edit
  # GET /users/1/edit.xml
  # GET /users/1/edit.json                                HTML AND AJAX
  #-------------------------------------------------------------------
#  def edit
#    respond_to do |format|
#      format.json { render :json => @user }
#      format.xml  { render :xml => @user }
#      format.html
#    end
#  end

  # DELETE /users/1
  # DELETE /users/1.xml
  # DELETE /users/1.json                                  HTML AND AJAX
  #-------------------------------------------------------------------
  def destroy
    @user = User.find(params[:id])
 
    allowed = (current_user.id.to_s == params[:id].to_s)
    if allowed
      try_destroy = @user.destroy
    else 
      try_destroy = false
    end

    if try_destroy
      respond_to do |format|
        format.json { render :json => {:result => :ok}, :status => 200 }
        format.xml  { head :ok }
        format.html { redirect_to :action => :index }
      end
    else
      respond_to do |format|
        format.json { render :text => "Could not destroy user", :status => :unprocessable_entity } # placeholder
        format.xml  { head :ok }
        format.html { render :action => :new, :status => :unprocessable_entity }
      end
    end
  end

  # POST /users
  # POST /users.xml
  # POST /users.json                                      HTML AND AJAX
  #-----------------------------------------------------------------
#  def create
#    role_ids = params[:user][:role_ids]
#    params[:user].delete :role_ids
#    @user = User.new(params[:user])
#    role_ids.each do |role_id|
#      puts role_id
#      role = Role.find_by_id role_id
#      if (role)
#        @user.roles << role
#      end
#    end
#    if @user.save
#      respond_to do |format|
#        format.json { render :json => @user.to_json, :status => 200 }
#        format.xml  { head :ok }
#        format.html { redirect_to :action => :index }
#      end
#    else
#      respond_to do |format|
#        format.json { render :text => "Could not create user", :status => :unprocessable_entity } # placeholder
#        format.xml  { head :ok }
#        format.html { render :action => :new, :status => :unprocessable_entity }
#      end
#    end
#  end

  # PUT /users/1
  # PUT /users/1.xml
  # PUT /users/1.json                                            HTML AND AJAX
  #----------------------------------------------------------------------------
  def update
    if params[:user][:password].blank?
      [:password,:password_confirmation,:current_password].collect{|p| params[:user].delete(p) }
    else
      @user.errors[:base] << "The password you entered is incorrect" unless @user.valid_password?(params[:user][:current_password])
    end

    respond_to do |format|
      if @user.errors[:base].empty? and @user.update_attributes(params[:user])
        flash[:notice] = "Your account has been updated"

        puts (params[:user])
        puts (params)
        puts flash[:notice]
        
        format.json { render :json => @user.to_json, :status => 200 }
        format.xml  { head :ok }
        format.html { render :action => :edit }
      else
        format.json { render :text => "Could not update user", :status => :unprocessable_entity } #placeholder
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
        format.html { render :action => :edit, :status => :unprocessable_entity }
      end
    end
  end

  def home # for dashboard
    @user = User.find(params[:id])
  end

  def favorite_items
    @user = current_user
    @fav_items = @user.favorite_items
    respond_to do |format|
      format.json { render :json => @fav_items, status: 200 }
      format.xml  { render xml: "Unsupported Format", status: 404 }
      format.html { render html: "Unsupported Format", status: 404 }
    end 
  end

  def kudo_items
    @user = current_user
    @kudo_items = @user.kudo_items
    respond_to do |format|
      format.json { render :json => @kudo_items, status: 200 }
      format.xml  { render xml: "Unsupported Format", status: 404 }
      format.html { render html: "Unsupported Format", status: 404 }
    end
  end 
end
