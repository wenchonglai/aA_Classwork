require 'byebug'
class Api::SessionsController < ApplicationController
  def create

    @user = User.find_by_credentials(user_params["username"], user_params["password"])
    p logged_in?
    if @user
      # if 
        self.login!(@user)
        redirect_to users_url(@user)
      # else
      #   render json: @user.errors.full_messages, status: 422
      # end
    else
      render json: ["User does not exist"], status: 404 
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])

    if @user
      # if 
        self.logout!
        redirect_to root_url
      # else
      #   render json: @user.errors.full_messages, status: 422
      # end
    else
      render json: ["user does not exist"], status: 404 
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
