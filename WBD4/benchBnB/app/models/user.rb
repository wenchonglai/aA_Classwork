class User < ApplicationRecord
  before_validation :ensure_session_token
  validates :username, :session_token, uniqueness: true, presence: true
  validates :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    return self.session_token
  end

  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    if @user && BCrypt::Password.new(@user.password_digest) == password
      return @user
    end
  end
end
