#!/bin/bash
set -x

ENV=${3:-development}

git pull origin master
git merge master | grep 'Already up-to-date'
#git pull $1 $2
#git merge $1/$2 | grep 'Already up-to-date'
CHANGES=$?

echo 'Changes:' $CHANGES

if [ $CHANGES -eq 1 ]
then
    echo 'New changes, restarting server'
    #thin stop
    pkill -u $USER ruby
    bundle install
    rake db:reset
    rake db:migrate RAILS_ENV=$ENV
    #rake db:seed
    rake db:populate_demo_user
    #rake db:populate
    #rake db:populate_widget
    rails server -e $ENV 
    #thin -p 8888 -d -e $ENV start;
fi
