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
    @item = Item.find(params[:id])
    @user_favorite_item = @current_user.user_favorite_items.build({
      item_id: item_id
    })

    if @user_favorite_item.save
      respond_to do |format|
        format.json { render :json => @comment.to_json, :status => 200 }
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

  def destroy
    @comment = FavoriteItem.find(params[:id])
    puts current_user.id, @comment.creator_id, current_user.id != @comment.creator_id
    if current_user.id != @comment.creator_id.to_i
      respond_to do |format|
        format.all { render :text => "Unauthorized action" }
      end
      return
    end

    if @comment.destroy
      respond_to do |format|
        format.all { render :json => {:result => :ok}, :status => 200 }
      end
    else
      respond_to do |format|
        format.all { render :text => "Could not delete comment", :status => :unprocessable_entity } # placeholder
      end
    end
  end
end
