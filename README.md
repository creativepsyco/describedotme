    Deployment guide for back-end server

##Deployment
1. Install Ruby version ~> 1.9.2, Ruby on Rails version ~> 3.2.8, RubyGem ~> v1.8.24.
  Reference to:
    http://rubyonrails.org/download

2. Configure database following the steps below.
3. Setup
```
      $ bundle install
      $ rake db:migrate
      $ rake db:seed
```

4. Populate sample data for manual testing. 
```
      $ rake db:populate_demo_user
```

5. Populate sample data for automated testing. (Ignore if not running automated testing).
```
      $ rake db:populate
```

6. Start the server
```
      $ rails server
```

7. Server will be up and running at localhost:3000



##Configuration for database:

1. Download and Install MySql database server from http://dev.mysql.com/downloads/mysql/
2. Login into MySql Db server using the root account.
```
      $ mysql -u root -p
      <enter passsword> 
```
  After logged in, we will start configure the database:

3. Create 3 database: describedotme_development, describedotme_test, describedotme_production (for development, test and producton environment)
```
       CREATE DATABASE IF NOT EXISTS describedotme_development;
       CREATE DATABASE IF NOT EXISTS describedotme_test;
       CREATE DATABASE IF NOT EXISTS describedotme_production;
```
4. Instead of running the db as root (which could be dangerous), the site is configure to run as another db user.
  Create db user: describedotme, password: describedotme (subject to change upon deployment)
```
      CREATE USER 'describedotme'@'localhost' IDENTIFIED BY 'describedotme';
```

5. Grant all priviliges for user describedotme
```
       GRANT ALL PRIVILEGES ON describedotme_development.* TO describedotme@localhost;
       GRANT ALL PRIVILEGES ON describedotme_test.* TO describedotme@localhost;
       GRANT ALL PRIVILEGES ON describedotme_production.* TO describedotme@localhost;
```