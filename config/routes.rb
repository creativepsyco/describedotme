DescribeMe::Application.routes.draw do

  authenticated :user do
    root :to => "home#index"
  end
  root :to => "home#show"

  resources :items do
    member do
      delete 'favorite' => 'favorites#destroy'
      delete 'kudo' => 'kudos#destroy'
    end
  end

  resources :attachments

  resources :comments, :only => [:show, :create, :destroy]

  devise_for :users
  resources :users do
    get 'profile' => 'users#profile', :on => :collection
    put 'profile' => 'users#updatecurrentuser', :on => :collection
    resources :items, :only => [:index, :show]
    resources :follows, :only => [:index, :create]

    resources :items do
      resources :favorites, :only => [:index, :create]
      resources :kudos, :only => [:index, :create]
    end
  end

  # follow
  authenticated :user do
    delete 'users/:user_id/follows' => 'follows#destroy'
    get 'users/:user_id/is_follow' => 'follows#is_follow'
    get 'followers' => 'follows#follower_index'
    get 'followings' => 'follows#following_index'
  end
  match 'profile' => 'home#profile'

  # routes for favorite and kudo for an item
  get 'items/:item_id/kudos' => 'kudos#index'
  get 'items/:item_id/favorites' => 'favorites#index'

  # post t favorite and kudo for an item
  post 'items/:item_id/kudos'     => 'kudos#create'
  post 'items/:item_id/favorites' => 'favorites#create'

  # destroy kudos
  delete 'items/:item_id/kudos'  => 'kudos#destroy'

  #routes for favorite and kudo:
  match 'favourite_items' => 'users#favorite_items'
  match 'kudo_items' => 'users#kudo_items'

  # routes for community page
  get 'featured_items' => 'items#featured_items'

  # routes for widget
  get 'widgets' => 'widgets#index'

  get 'widgets/users/:user_id' => 'widgets#get_widget_for_user'
  get 'widgets/:widget_id/users/:user_id' => 'widgets#get_config'
  get 'widgets/:widget_id/delete' => 'widgets#delete_widget'
  post 'widgets/:widget_id/users/:user_id' => 'widgets#set_config'
  post 'widgets' => 'widgets#create'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
