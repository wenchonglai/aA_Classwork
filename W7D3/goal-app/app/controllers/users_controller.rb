class UsersController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.create(user_params)

    if @user
      if @user.save
        render :show
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    else
      flash.now[:errors] = ["error"]
      render :new
    end
  rescue 
    flash.now[:errors] = ["error"]
    render :new
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
