class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: user
    else
      render json: user.errors.full_messages, status: 422
    end
  end

  def show
    user = User.find_by(id: params[:id])
    
    if user
      render json: user
    else
      render plain: "User#{params[:id]} not found", status: 422
    end
  end

  def update
    user = User.find_by(id: params[:id])
    
    if user
      user.update(user_params)
      render json: user
    else
      redirect_to "/users/#{params[:id]}"
    end
  end

  def destroy
    user = User.find_by(id: params[:id])

    if user
      user.destroy
      redirect_to "/users"
    else
      redirect_to "/users/#{params[:id]}"
    end
  end

  private 
  def user_params
    params.require(:user).permit(:username)
  end
end
