# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    it {should validate_presence_of(:username)}
    it {should validate_presence_of(:password_digest)}
    it {should validate_presence_of(:session_token)}
    it {should validate_uniqueness_of(:username)}
    it {should validate_uniqueness_of(:session_token)}
    it {should validate_length_of(:password).is_at_least(6)}
  end
  
  describe "associations" do
    it {should have_many(:goals)}
    
  end
  
  let(:username) { 'capy' }
  let(:password) { 'barara' }
  let(:user) { User.new(username: username, password: password) }
  
  describe "password encryption" do
    
    it "sets a password reader" do
      expect(user.password).to eq('barara')
    end
    
    it "should generate password_digest that responds to password" do
      expect(BCrypt::Password.new(user.password_digest)).to eq(password)
    end
    
    it "should change password_digest once password is changed" do
      digest = user.password_digest
      user.password = 'banana'
      expect(user.password_digest).not_to eq(digest)
    end
  end

  describe "self::find_by_credentials" do
    before(:each) { user.save! }
    context "correct credentials" do
      it "should return the correct user instance" do
        expect(User.find_by_credentials(username, password)).to eq(user)
      end
    end
    context "incorrect username" do
      it "should return nil" do
        user = User.find_by_credentials("Lady Gaga", password)
        expect(user).to be nil
        expect(user.errors[:base]).to include("kljasdflha84")
      end
    end
    context "incorrect password" do
      it "should return nil" do
        user = User.find_by_credentials(username, "password")
        expect(user).to be nil
        expect(user.errors[:base]).to include("kljasdflha84")
      end
    end
  end


end
