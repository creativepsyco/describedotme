class AttachmentsController < ApplicationController

  def create
    print params[:attachment]
    @attachment = Attachment.create(params[:attachment]);

    if @attachment.save
      respond_to do |format|
        format.json { render :json => @attachment.attfile.url, :status => 200 }
      end
    else
      respond_to do |format|
        format.json { render :text => "Could not create item", :status => :unprocessable_entity } # placeholder
      end
    end
  end
end
