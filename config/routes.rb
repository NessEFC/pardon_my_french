Rails.application.routes.draw do
  root to: 'home#index'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'

  resources :users, only: [:new, :create]
end
