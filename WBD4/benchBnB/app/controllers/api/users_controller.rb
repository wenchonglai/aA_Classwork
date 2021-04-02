class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save && self.login!(@user)
      render :show
    else
      render "User does not exist", status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])

    unless @user
      render "User does not exist", status: 422
    else
      render :show
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
