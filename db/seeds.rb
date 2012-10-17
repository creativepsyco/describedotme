# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Category.create! :name => 'Photo', :description => 'Photos taken by you'
Category.create! :name => 'Computer Program', :description => 'Computer Programs written by you'
Category.create! :name => 'Written Song', :description => 'Songs written by you'
Category.create! :name => 'Performed Song', :description => 'Songs performed by you'
Category.create! :name => 'Drawing', :description => 'Drawings drawn by you'



role = Role.create! :role => 'super_admin'
role1 = Role.create! :role => 'admin'
role2 = Role.create! :role => 'normal'

