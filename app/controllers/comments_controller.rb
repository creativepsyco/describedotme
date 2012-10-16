class CommentsController < ApplicationController
  before_filter :user_signed_in?, :only => [:create, :destroy]

  # Make the current item object available to views
  #----------------------------------------
  def get_user
    @current_user = current_user
  end

=begin get all comments through items for now
  def index
    @item = Item.find(params[:item_id])
    respond_to do |format|
      format.json { render :json => @item.comments}
      format.xml  { render text: "Unsupported Format", status: 404 }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end
=end

  def show
    @comment = Comment.find(params[:id])
    respond_to do |format|
      format.json { render :json => @comment }
      format.xml  { render text: "Unsupported Format", status: 404 }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
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

  def create
    @item = Item.find(params[:item_id])
    @comment = @item.comments.build({
      content: params[:content],
      creator_id: current_user.id
    })

    if @comment.save
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
end
