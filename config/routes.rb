Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/comics", to: "comics#index"
  post "/comics", to: "comics#create"
  get "/comics/:id", to: "comics#show"
  patch "/comics/:id", to: "comics#update"
  delete "/comics/:id", to: "comics#destroy"
  get "/allcomics", to: "comics#public_index"
  get "/allcomics/:id", to: "comics#public_show"
  get "/marvelcomics", to: "comics#marvel_index"
end
