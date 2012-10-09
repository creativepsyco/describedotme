class Users::RegistrationsController < Devise::RegistrationsController
#  before_filter :check_permissions, :only => [:new, :create, :cancel]
#  skip_before_filter :require_no_authentication

  before_filter :normalize_params, :only => [:create]

'''
#  def check_permissions
#    authorize! :create, resource
#  end
'''
  
  def normalize_params
		role_ids = params[:user][:role_ids]
    params[:user].delete :role_ids
    params[:user][:roles] = []
    role_ids.each do |role_id|
      role = Role.find_by_id role_id
      if (role)
        params[:user][:roles] << role
      end
    end

    puts params[:user]
  end

end