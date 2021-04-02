class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    return false if logged_in?
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout!
    return false unless logged_in?
    self.current_user.reset_session_token!
    @current_user = nil
    session[:session_token] = nil
    return true
  end

  def logged_in?
    !!self.current_user
  end
end
