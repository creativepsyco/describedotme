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
      email = "example-#{n+1}@describe.me"
      password = "password"
      User.create(name: name,
                  email: email,
                  password: password,
                  password_confirmation: password)
    end
    puts "Populate sample posts"
    users = User.all(limit: 6)
    10.times do
      description = Faker::Lorem.sentence(5)
      title = Faker::Lorem.sentence(1)
      users.each do |user|
        user.items.create!(title: title,
                           description: description)
      end
    end

    puts "Populate sample photos"
    sample_photos = [
      'http://behance.vo.llnwd.net/profiles4/146258/projects/5480661/0970f716f3f81d5afbee8bcc0bdab799.jpg',
      'http://behance.vo.llnwd.net/profiles4/186343/projects/5402127/aed49c8e0f69530647cf392d7ecab54e.jpg',
      'http://behance.vo.llnwd.net/profiles4/186343/projects/5402127/67b1339fe7c1a188a192c10ad01a24e6.jpg',
      'http://behance.vo.llnwd.net/profiles4/146258/projects/5480661/c82577952c4ffb0ce09a8cc35342fc0b.jpg',
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT5TugLEl-oYvpK3vNFiMUPtPv0pW62We47z771AnxNN095we69Sg',
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR_w1Xy0dkENBe9RUdwHIpDPi376EzAGINYhKLTlbuVdAgO7aze',
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcScpPzn5sAXcxgqgVX7II65lqvNCSfykwTSuY_s8yISWKrJFa4P1A',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSir4AXIJUjG5n6mrcRydH6ZDsk5V9rqJqSh7ZyY6pLErLnfejHIQ',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnt2L9CO6PTG3B_IVWeNbTEsykEigJP-fZWezcH5mW4vb21YDA'
    ]

    5.times do
      users.each do |user|
        user.items.each do |item|
          photo = item.photos.create!(
            caption: Faker::Lorem.sentence(3),
            photo_url: sample_photos.sample
          )
        end
      end
    end

    puts "Populate sample comments"
    5.times do
      users.each do |user|
        user.items.each do |item|
          creator = users.sample
          comment = item.comments.create!(
            creator_id: creator.id,
            content: Faker::Lorem.sentence(7)
          )
        end
      end
    end
  end
end
