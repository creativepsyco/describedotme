class AttachmentsController < ApplicationController

  def create
    print params[:attachment]
    @attachment = Attachment.create(params[:attachment])
    @attachment.url = @attachment.attfile.url

    if @attachment.save
      respond_to do |format|
        format.json { render :json => @attachment, :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render :text => "Could not create item", :status => :unprocessable_entity } # placeholder
      end
    end
  end
end
