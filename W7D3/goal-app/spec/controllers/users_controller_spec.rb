require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:valid_params){ { user: {username: 'capy', password: 'barara'} } }
  let(:short_pwd_params){ { user: {username: 'capy', password: 'bara'} } }
  let(:invalid_username_params){ { user: {username: 'Lady Gaga', password: 'bara'} } }
  let(:no_prime_key_params){ { username: 'capy', password: 'barara' } }
  
  describe "GET #new" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
      expect(response).to render_template(:new)
    end
  end

  describe "GET #create" do
    context "with valid params" do
      it "returns http success" do
        get :create, params: valid_params
        expect(response).to have_http_status(:success)
        expect(response).to render_template(:show)
      end
    end

    context "with short password" do
      it "rerenders :new" do
        get :create, params: short_pwd_params
        expect(response).to render_template(:new)
        expect(flash[:errors]).not_to be_empty
      end
    end

    context "with invalid username" do
      it "rerenders :new" do
        get :create, params: invalid_username_params
        expect(response).to render_template(:new)
        expect(flash[:errors]).not_to be_empty
      end
    end

    context "without primary key" do
      it "rerenders :new" do
        get :create, params: no_prime_key_params
        expect(response).to render_template(:new)
        expect(flash[:errors]).not_to be_empty
      end
    end
  end

end
