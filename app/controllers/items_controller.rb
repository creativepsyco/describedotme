class ItemsController < ApplicationController

  before_filter :user_signed_in?, :only => [:create, :new, :edit, :destroy]

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

  def identify_user
    if !params[:user_id]
      @user = current_user
    elsif
      @user = User.find(params[:user_id])
    end
    return @user
  end

  def convert_to_json(item)
    default_photo = 'http://placehold.it/300x200'
    return {
      :id => item.id,
      :title => item.title,
      :desc => item.description,
      :thumbnail => item.photos.empty? ? default_photo : item.photos[0].photo_url,
      :attachments => item.attachments || item.photos, # todo: cange to item.attachments
      :comments => item.comments,
      :kudos_count => item.kudos_count
    }
  end

  def featured_items
    default_photo = 'http://placehold.it/300x200'
    @items = Item.all(limit: 50).shuffle.first(10)
    @itemlist = @items.map do |item|
      {
        :id => item.id,
        :title => item.title,
        :desc => item.description,
        :thumbnail => item.photos.empty? ? default_photo : item.photos[0].photo_url,
        :creator_id => item.creator.id,
        :creator_name => item.creator.name,
        :kudos_count => item.kudos_count
      }
    end
    respond_to do |format|
      format.json { render :json => @itemlist }
      format.xml  { render :xml => @items }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  # GET /items
  # GET /items.xml
  # GET /items.json                                       HTML and AJAX
  #-----------------------------------------------------------------------
  def index
    self.identify_user
    @items = @user.items
    @itemlist = @items.map do |item|
      convert_to_json(item)
    end
    respond_to do |format|
      format.json { render :json => @itemlist }
      format.xml  { render :xml => @items }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  # GET /items/new
  # GET /items/new.xml
  # GET /items/new.json                                    HTML AND AJAX
  #-------------------------------------------------------------------
  def new
    @user = current_user
    @item = current_user.items.build
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
    self.identify_user
    @item = Item.find(params[:id])
    @itemjson = convert_to_json(@item)
    puts @itemjson
    respond_to do |format|
      format.json { render :json => @itemjson}
      format.xml  { render :xml => @item }
      format.html
    end
  end

  # GET /items/1/edit
  # GET /items/1/edit.xml
  # GET /items/1/edit.json                                HTML AND AJAX
  #-------------------------------------------------------------------
  def edit
    @item = Item.find(params[:id])
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
    @item = Item.find(params[:id])
    if current_user.id != @item.creator_id.to_i
      respond_to do |format|
        format.all { render :text => "Unauthorized action" }
      end
      return
    end

    puts 'Pass authentication check'

    if @item.destroy
      respond_to do |format|
        format.all { render :json => {:result => :ok}, :status => 200 }
      end
    else
      respond_to do |format|
        format.all { render :text => "Could not delete comment", :status => :unprocessable_entity } # placeholder
      end
    end
  end

  # POST /items
  # POST /items.xml
  # POST /items.json                                      HTML AND AJAX
  #-----------------------------------------------------------------
  def create
    puts params
    item_data = {
      :title => params[:title],
      :description => params[:description]
    }
    @item = current_user.items.build(item_data)
    if params[:attachments]
      params[:attachments].each do |att_id|
        @att = Attachment.find(att_id)
        @item.attachments.push(@att)
        if @att.att_type == 'photo'
          @item.photos.build(
            photo_url: @att.url
          )
        end
      end
    end
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
    @item = Item.find(params[:id])
    respond_to do |format|
      if @item.update_attributes(params[:item])
        flash[:notice] = "Item has been updated"
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
