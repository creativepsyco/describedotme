class ItemsController < ApplicationController
  before_filter :get_user, :only => [:index,:new,:edit]
  before_filter :accessible_roles, :only => [:new, :edit, :show, :update, :create]
  load_and_authorize_resource :only => [:show,:new,:destroy,:edit,:update]
 
  # Get roles accessible by the current item
  #----------------------------------------------------
  def accessible_roles
    @accessible_roles = Role.accessible_by(current_ability, :read)
  end
 
  # Make the current item object available to views
  #----------------------------------------
  def get_user
    @current_user = current_user
  end


  # GET /items
  # GET /items.xml                                                
  # GET /items.json                                       HTML and AJAX
  #-----------------------------------------------------------------------
  def index
    @items = Item.accessible_by(current_ability, :index).limit(20)
    respond_to do |format|
      format.json { render :json => @items }
      format.xml  { render :xml => @items }
      format.html
    end
  end
 
  # GET /items/new
  # GET /items/new.xml                                            
  # GET /items/new.json                                    HTML AND AJAX
  #-------------------------------------------------------------------
  def new
    respond_to do |format|
      format.json { render :json => @item }   
      format.xml  { render :xml => @item }
      format.html
    end
  end
 
  # GET /items/1
  # GET /items/1.xml                                                       
  # GET /items/1.json                                     HTML AND AJAX
  #-------------------------------------------------------------------
  def show
  	if (!params[:id]) 
  	  @item = current_item
  	end
   	@item = Item.find(params[:id]) 
   	puts "Item: ", @item, @item.name, @item.id
    respond_to do |format|
      format.json { render :json => @item }
      format.xml  { render :xml => @item }
      format.html      
    end
  end
 
  # GET /items/1/edit                                                      
  # GET /items/1/edit.xml                                                      
  # GET /items/1/edit.json                                HTML AND AJAX
  #-------------------------------------------------------------------
  def edit
    respond_to do |format|
      format.json { render :json => @item }   
      format.xml  { render :xml => @item }
      format.html
    end
  end
 
  # DELETE /items/1     
  # DELETE /items/1.xml
  # DELETE /items/1.json                                  HTML AND AJAX
  #-------------------------------------------------------------------
  def destroy
    @item.destroy!
 
    respond_to do |format|
      format.json { respond_to_destroy(:ajax) }
      format.xml  { head :ok }
      format.html { respond_to_destroy(:html) }      
    end
  end
 
  # POST /items
  # POST /items.xml         
  # POST /items.json                                      HTML AND AJAX
  #-----------------------------------------------------------------
  def create
    @item = Item.new(params[:item])
 
    if @item.save
      respond_to do |format|
        format.json { render :json => @item.to_json, :status => 200 }
        format.xml  { head :ok }
        format.html { redirect_to :action => :index }
      end
    else
      respond_to do |format|
        format.json { render :text => "Could not create item", :status => :unprocessable_entity } # placeholder
        format.xml  { head :ok }
        format.html { render :action => :new, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /items/1
  # PUT /items/1.xml
  # PUT /items/1.json                                            HTML AND AJAX
  #----------------------------------------------------------------------------
  def update
    if params[:item][:password].blank?
      [:password,:password_confirmation,:current_password].collect{|p| params[:item].delete(p) }
    else
      @item.errors[:base] << "The password you entered is incorrect" unless @item.valid_password?(params[:item][:current_password])
    end
 
    respond_to do |format|
      if @item.errors[:base].empty? and @item.update_attributes(params[:item])
        flash[:notice] = "Your account has been updated"
        format.json { render :json => @item.to_json, :status => 200 }
        format.xml  { head :ok }
        format.html { render :action => :edit }
      else
        format.json { render :text => "Could not update item", :status => :unprocessable_entity } #placeholder
        format.xml  { render :xml => @item.errors, :status => :unprocessable_entity }
        format.html { render :action => :edit, :status => :unprocessable_entity }
      end
    end
  end

end
