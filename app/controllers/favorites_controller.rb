class FavoritesController < ApplicationController
  before_filter :user_signed_in?, :only => [:create, :destroy]

  # Make the current item object available to views
  #----------------------------------------
  def get_user
    @current_user = current_user
  end

  def index
    # if item id exist => list all favorite users for this item

    @item = Item.find(params[:item_id])
    @favorites = @item.favorite_users

    respond_to do |format|
      format.json { render :json => @favorites}
      format.xml  { render text: "Unsupported Format", status: 404 }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  def create
    puts params
    @item = Item.find(params[:item_id])
    item_id = params[:item_id]

    # Current user cannot favorite twice
    @favorites = UserFavoriteItem.find_by_user_id_and_item_id(@current_user.id, item_id)

    if !@favorites.nil? 
      puts " Favorites already exists for this user"
      respond_to do|format|
        format.all { return render :text => "Current User has already done favorite", :status => :unprocessable_entity } # placeholder
      end
    end 

  
    @user_favorite_item = @current_user.user_favorite_items.build({
      item_id: item_id
    })


    if @user_favorite_item.save
      @item.save

      respond_to do |format|
        format.json { render :json => @user_favorite_item.to_json, :status => 200 }
        format.xml  { head :ok }
        format.html { redirect_to :action => :index }
      end
    else
      respond_to do |format|
        format.json { render :text => "Could not add item to favorite list", :status => :unprocessable_entity } # placeholder
        format.xml  { head :ok }
        format.html { render :action => :new, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @user_favorite_item = UserFavoriteItem.find(:first, :conditions => ["user_id = ? and item_id = ?", @current_user.id, params[:item_id]])
    
    @item = Item.find(params[:item_id])
    @item.save

    puts @user_favorite_item
    
    # check if the item exists or not
    if @user_favorite_item.nil?
      respond_to do |format|
        format.all {return render :text => "Current User has not favorites this item", :status => 404 }
      end 
    end

    if @user_favorite_item.destroy
      respond_to do |format|
        format.all { render :json => {:result => :ok}, :status => 200 }
      end
    else
      respond_to do |format|
        format.all { render :text => "Could not remove this item from Favorites list", :status => :unprocessable_entity } # placeholder
      end
    end
  end
end
