class UsersController < ApplicationController
  def new
    #render sign up form
    render :new
  end
  
  def create
    #use data from sign up form to create a new user; 
    #log in
    #then redirect to the cats index page
    @user = User.create(params.require(:user).permit(:user_name, :password))
    p params
    # p strong_params

    if @user.save
      login!(@user)
      redirect_to cats_url
    else
      render :new
    end
  end

  # private
  # def strong_params
  #   params.require(:user).permit(:user_name, :password)
  # end
end
