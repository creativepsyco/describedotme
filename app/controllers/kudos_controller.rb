class KudosController < ApplicationController
  before_filter :user_signed_in?, :only => [:create, :destroy]

  # Make the current item object available to views
  #----------------------------------------
  def get_user
    @current_user = current_user
  end

  def index
    # if item id exist => list all favorite users for this item

    @item = Item.find(params[:item_id])
    @kudos = @item.kudo_users

    respond_to do |format|
      format.json { render :json => @kudos}
      format.xml  { render text: "Unsupported Format", status: 404 }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  def create
    puts params
    @item = Item.find(params[:item_id])
    item_id = params[:item_id]
    @user_kudo_item = @current_user.user_kudo_items.build({
      item_id: item_id
    })
    

    if @user_kudo_item.save
      respond_to do |format|
        format.json { render :json => @user_kudo_item.to_json, :status => 200 }
        format.xml  { head :ok }
        format.html { redirect_to :action => :index }
      end
    else
      respond_to do |format|
        format.json { render :text => "Could not add item to kudo list", :status => :unprocessable_entity } # placeholder
        format.xml  { head :ok }
        format.html { render :action => :new, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @user_kudo_item = UserKudoItem.find(:first, :conditions => ["user_id = ? and item_id = ?", @current_user.id, params[:item_id]])
    
    puts @user_kudo_item
    
    if @user_kudo_item.destroy
      respond_to do |format|
        format.all { render :json => {:result => :ok}, :status => 200 }
      end
    else
      respond_to do |format|
        format.all { render :text => "Could not remove this item from favorite list", :status => :unprocessable_entity } # placeholder
      end
    end
  end
end
