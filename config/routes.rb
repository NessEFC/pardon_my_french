Rails.application.routes.draw do
  root to: 'home#index'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :users, only: [:new, :create]

  namespace :api do
    namespace :v1 do
      resources :cards, only: [:create, :update]
    end
  end
end
