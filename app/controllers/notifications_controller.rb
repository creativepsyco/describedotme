class NotificationsController < ApplicationController
  before_filter :get_user, :only => [:destroy, :index]
  before_filter :user_signed_in?, :only => [:destroy, :index]

  def get_user
    @current_user = current_user
  end


  def index
    notifications = @current_user.recent_notifications
    respond_to do |format|
      format.json { render :json => notifications }
      format.xml  { render text: "Unsupported Format", status: 404 }
      format.html { render text: "Unsupported Format", status: 404 }
    end
  end

  def destroy
    @notification = Notification.find(params[:id])
    if @notication.destroy
      respond_to do |format|
        format.all { render :json => {:result => :ok}, :status => 200 }
      end
    else
      respond_to do |format|
        format.all { render :text => "Could not delete follow relation", :status => :unprocessable_entity } # placeholder
      end
    end
  end

end
