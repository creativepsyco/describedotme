# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
puts 'SETTING UP DEFAULT USER LOGIN'

role = Role.create! :role => 'super_admin'
role1 = Role.create! :role => 'admin'
role2 = Role.create! :role => 'normal'



puts 'New roles created: ' << role.role, role1.role, role2.role