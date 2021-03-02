class SessionsController < ApplicationController
  def new
    #render the log in form
    render :new
  end

  def create
    #if successful, log in the user, and redirect to the index page
    #if not successful, 
    @user = User.find_by_credentials(params[:user][:user_name], params[:user][:password])

    if @user
      self.login!(@user)
      redirect_to cats_url
    else
      render :new
    end

  end

  def destroy
    # @user = User.find_by_credentials(params[:user][:user_name], params[:user][:password])
    self.logout!
  end
end
