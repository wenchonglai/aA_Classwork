class SessionsController < ApplicationController

  before_action :ensure_logged_in, only: [:destroy]

  def new

  end

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])

    if @user
      self.login!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = ["Invalid Username and Password"]
      render :new
    end
    
  end

  def destroy
    
    @user = self.current_user
    self.log_out!
    redirect_to new_session_url
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
  
end
