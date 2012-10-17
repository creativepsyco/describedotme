namespace :db do
  desc "Fill database with sample data"

  task populate: :environment do
    profile_url = [
      "http://www.catsofaustralia.com/photogallery/Big%20Photos/czarnew.jpg",
      "http://ec.comps.canstockphoto.com/can-stock-photo_csp9341208.jpg",
      "http://www.tutorialsscripts.com/free-icons/funny-icons/black-funny-icon-256-x-256.png",
      "http://cloudfront3.bostinno.com/wp-content/uploads/2012/09/large_funny_twitter_icon.jpeg"
    ]

    sample_desc = [
      "I'm a solo coder, who like to draw as well :)",
      "I love to draw, and sing. Well, cooking is also one of my big interest",
      "A thinker, who loves to think about the meaning of life..."
    ]
    puts "Populate sample users"
    User.create(name: "Example User",
                email: "example@describe.me",
                password: "foobar",
                password_confirmation: "foobar",
                description: sample_desc.sample,
                photo_url: profile_url.sample)
    20.times do |n|
      name = Faker::Name.name
      email = "example-#{n+1}@describe.me"
      password = "password"
      User.create(name: name,
                  email: email,
                  password: password,
                  password_confirmation: password,
                  description: sample_desc.sample,
                  photo_url: profile_url.sample)
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

  task populate_widget: :environment do
    users = User.all()
    #2.times do
      Widget.create(creator_id: users.sample.id, thumbnail:"http://lorempixel.com/g/400/200", name: "Hello")
      Widget.create(creator_id: users.sample.id, thumbnail:"", name: "Clock")
    #end
    # create one for first user
    widgets = Widget.all()
    UsersWidgets.create(user_id: users[1].id,
                        widget_id: widgets.sample.id,
                        config_json: Faker::Lorem.sentence(3))
    20.times do
      UsersWidgets.create(user_id: users.sample.id,
                          widget_id: widgets.sample.id,
                          config_json: Faker::Lorem.sentence(3))
    end
  end
end
