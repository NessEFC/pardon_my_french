Rails.application.routes.draw do
  root to: 'home#index'

  get '/login', to: 'sessions#new'

  resources :users, only: [:new, :create]
end
