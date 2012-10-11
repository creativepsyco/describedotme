namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    puts "Populate sample users"
    User.create(name: "Example User",
                email: "example@describe.me",
                password: "foobar",
                password_confirmation: "foobar")
    20.times do |n|
      name = Faker::Name.name
      puts name
      email = "example-#{n+1}@describe.me"
      password = "password"
      User.create(name: name,
                  email: email,
                  password: password,
                  password_confirmation: password)
    end
    puts "Populate sample posts"
    users = User.all(limit: 6)
    50.times do
      description = Faker::Lorem.sentence(5)
      title = Faker::Lorem.sentence(1)
      puts title, description
      users.each do |user|
        user.items.create!(title: title,
                           description: description)
      end
    end
  end
end
