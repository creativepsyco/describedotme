##Configuration for database:

1. Install mysql server
2. Enter these commands into the bash 
  Create db user: describedotme, pass: describedotme (subject to change upon deployment)

```
       CREATE USER 'describedotme'@'localhost' IDENTIFIED BY 'describedotme';
```

3. Open mysql
4. Create 3 database: describedotme_development, describedotme_test, describedotme_production
```
       CREATE DATABASE IF NOT EXISTS describedotme_development;
       CREATE DATABASE IF NOT EXISTS describedotme_test;
       CREATE DATABASE IF NOT EXISTS describedotme_production;
```

4. Grant all priviliges for user describedotme
```
       GRANT ALL PRIVILEGES ON describedotme_development.* TO describedotme@localhost;
       GRANT ALL PRIVILEGES ON describedotme_test.* TO describedotme@localhost;
       GRANT ALL PRIVILEGES ON describedotme_production.* TO describedotme@localhost;
```

5. Setup
``` bash
      bundle install
      rake db:migrate
      rake db:seed
```

6. (Ignore if not running automated testing) For Testing one more additional step
``` bash
      rake db:populate
```

7. Populate 
``` bash
       $ rake db:populate_demo_user
```

##API

Current API route: add.json for json result

                    root        /                                        home#index
                    root        /                                        home#index
For log in:
          

                                // haven't tested this part with JSON format (it should work, but need testing here!
                                // Hoang: retest all sign in / up / out API with JSON

        new_user_session GET    /users/sign_in(.:format)                 devise/sessions#new
            user_session POST   /users/sign_in(.:format)                 devise/sessions#create
    destroy_user_session DELETE /users/sign_out(.:format)                devise/sessions#destroy
           user_password POST   /users/password(.:format)                devise/passwords#create
       new_user_password GET    /users/password/new(.:format)            devise/passwords#new
      edit_user_password GET    /users/password/edit(.:format)           devise/passwords#edit
                         PUT    /users/password(.:format)                devise/passwords#update
cancel_user_registration GET    /users/cancel(.:format)                  devise/registrations#cancel

For user:

``` javascript
             user profile GET   /users(.:format)                         users#profile
                                # return: 
                                {id: int, name: string, email: string, num_items: int, 
                                  items: [{title: string, description: string, photos: [{photo_url: string, description: string}, ..], tags: [string]}]}

                   users GET    /users(.:format)                         users#index
                                # return: # i think we need to change name => first name / last name
                                [{name: string, email: string, num_items: int}]

       user_registration POST   /users(.:format)                         devise/registrations#create


   new_user_registration GET    /users/sign_up(.:format)                 devise/registrations#new
                                // not used

  edit_user_registration GET    /users/edit(.:format)                    devise/registrations#edit
                         PUT    /users(.:format)                         devise/registrations#update
                         DELETE /users(.:format)                         devise/registrations#destroy
```

####User Update Settings
``` bash
PUT /users/profile
```
Data to send 

``` javascript
/* Example JSON */
{
  "user":{
    "theme": "AAHFDAFD"
  }
}
```

For user item: 

                                // Hung: in charge of this part

              user_items GET    /users/:user_id/items(.:format)          items#index
                   items GET    /items                                   items#index       current user's all items
                                return:
                                [{title: string, description: string, files_id: [int], tags: [string]}]
                                
                                # files_id: array of files associated with this item <photo, songs ... >

                         POST   /items(.:format)          items#create
                                # create new item
                                # params:
                                {title: string, description: string, files_id: [int], tags: [string]}

                                return:
                                {result: "ok"}  /  {result: "not_ok", error_message: string}

                new_item GET    /items/new(.:format)      items#new
                                
               edit_item GET    /items/:id/edit(.:format) items#edit

               user_item GET    /users/:user_id/items/:id(.:format)      items#show
                    item GET    /items/:id                               items#show        current user's items
                                {title: string, description: string, files_id: [int], tags: [string]}

                         PUT    /items/:id(.:format)      items#update
                                # params:
                                {title: string, description: string, files_id: [int], tags: [string]}
                                # return:
                                {result: "ok"}  /  {result: "not_ok", error_message: string}

                         DELETE /items/:id(.:format)      items#destroy
                                # return:
                                {result: "ok"}  /  {result: "not_ok", error_message: string}

###For Kudos

              kudo_items (Current) GET      /kudo_items(.:format)                              users#kudo_items
              current_user_kudos   GET      /items/:item_id/kudos(.:format)     kudos#index
                                   POST     /items/:item_id/kudos(.:format)     kudos#create
                                   DELETE   /items/:item_id/kudos(.:format)     kudos#create
