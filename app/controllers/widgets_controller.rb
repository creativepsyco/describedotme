class WidgetsController < ApplicationController

  before_filter :user_signed_in?, :only => [:set_config, :create]

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

  def index
    @widgets = Widget.all
    respond_to do |format|
      format.json { render :json => @widgets }
      format.xml  { render :xml => @widgets }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  def get_widget_for_user
    self.identify_user
    @widgets= @user.enabled_widgets
    respond_to do |format|
      format.json { render :json => @widgets }
      format.xml  { render :xml => @widgets }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  def get_config
    @user_widget = UsersWidgets.where(user_id: params[:user_id], widget_id: params[:widget_id]).first
    respond_to do |format|
      format.json { render :json => @user_widget.config_json }
      format.xml  { render :xml => @user_widget.config_json }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  def set_config
    user_widget = UsersWidgets.where(widget_id: params[:widget_id], user_id: current_user.id).first
    if user_widget.nil?
      user_widget = UsersWidgets.create(widget_id: params[:widget_id], user_id: current_user.id)
    end
    user_widget.config_json = params[:config_json]
    user_widget.save
    respond_to do |format|
      format.json { render :json => @user_widget }
      format.xml  { render :xml => @user_widget }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  def create
    puts params
    widget_data = {
      :title => params[:title],
      :description => params[:description],
      :thumbnail => params[:thumbnail],
      :location => params[:location],
      :creator_id => current_user.id
    }

    @widget = Widget.new(widget_data)
    
    if @widget.save
      respond_to do |format|
        format.json { render :json => @widget.to_json, :status => 200 }
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
