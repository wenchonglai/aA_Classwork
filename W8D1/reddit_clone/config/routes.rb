Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:new, :create, :destroy, :index, :show] do
    resources :subs, only: [:create]
  end

  resources :subs, except: [:create] do 
    resources :posts, only: [:index]
  end

  resources :posts, except: [:index] do
    resources :comments, only: [:new]
  end

  resources :comments, only: [:create]

  resource :session, only: [:new, :create, :destroy]

end
