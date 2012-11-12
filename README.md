##Deployment
1. Install Ruby on Rails.
2. Configure database following the steps below.
3. Setup
```
      $ bundle install
      $ rake db:migrate
      $ rake db:seed
```

4. Populate sample data for testing. (Ignore if not running automated testing).
```
      $ rake db:populate_demo_user
      $ rake db:populate
```

5. Start the server
```
      $ rails server
```

6. Server will be up and running at localhost:3000


##Configuration for database:

1. Install mysql server
2. Enter these commands into the bash.
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