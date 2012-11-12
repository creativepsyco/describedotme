namespace :db do
  desc "Fill database with sample data"

  task populate_demo_user: :environment do
    puts "Populate  User called Robinson Cravents :example@describe.me"
    user = User.create(name: "Robinson Cravents",
    email: "example@describe.me",
    password: "foobar",
    password_confirmation: "foobar",
    description: 'I love to draw, and sing. Well, cooking is also one of my big interest',
    photo_url: 'http://behance.vo.llnwd.net/profiles/58036/b9d4960785150ab2cb73e48efb923ff2.png')

    project_name = [
      'Verticals', 'Metrio Tea', 'Metrio Coffee Packagin', 'Missile, Energy drink identity',
      'Hindukusch - Identity', 'Cooper Motorsport - Identity', 'BABILLA - Corporate Visual Identity',
    ]

    cover_photo = [
      'http://behance.vo.llnwd.net/profiles/58036/projects/5413899/096b7d0c26ca4e849a000a9b6e135b01.png',
      'http://behance.vo.llnwd.net/profiles/58036/projects/4249443/3d1ee0d0096dcd4498447f093c48278e.png',
      'http://behance.vo.llnwd.net/profiles/58036/projects/2718311/e0145200f2813c3ec2938af8719e47d0.png',
      'http://behance.vo.llnwd.net/profiles/58036/projects/280878/0580361249667515.png',
      'http://behance.vo.llnwd.net/profiles/58036/projects/206542/0580361238946490.png',
      'http://behance.vo.llnwd.net/profiles/58036/projects/365133/0580361261179463.png',
      'http://behance.vo.llnwd.net/profiles/58036/projects/330673/0580361258650119.png'
    ]

    project_name.length.times do |n|
      description = Faker::Lorem.sentence(5)
      item = user.items.create!(title: project_name[n],
      description: description)
      photo = item.photos.create!(
      caption: Faker::Lorem.sentence(3),
      photo_url: cover_photo[n]
      )
    end

    users = User.all()
    #2.times do
    Widget.create(creator_id: users.sample.id, thumbnail:"http://lorempixel.com/g/400/200", name: "Hello")
    Widget.create(creator_id: users.sample.id, thumbnail:"http://goo.gl/YpH0I", name: "Clock")
    Widget.create(creator_id: users.sample.id, thumbnail:"http://devfiles.myopera.com/articles/1281/widget_control_buttons.png", name: "Twitter Widget")
    Widget.create(creator_id: users.sample.id, thumbnail:"http://flickholdr.com/200/300", name: "Contact Form")



    puts "Populate Another User called Emma Watson :example2@describe.me"
    user2 = User.create(name: "Emma Watson",
    email: "example2@describe.me",
    password: "foobar",
    password_confirmation: "foobar",
    description: 'I love to act and, Love Pinterest and dogs. Well, cooking is also one of my big interest',
    photo_url: 'https://lh6.googleusercontent.com/-SfFJb67xmho/UCvr31BJKPI/AAAAAAAADXc/bfRvF5xnnDc/s500/emma_watson-g%2Bprofile.jpg')

    puts "Making Robinson follow Emmma Watson" 
    
    user.following_user_ids = [2];
    
    project_name = [
      'Harry Potter 1', 'Harry Potter 2', 'Harry Potter 3', 'Harry Potter 4',
      'Harry Potter 5', 'Harry Potter 6', 'Harry Potter 7',
    ]

    cover_photo = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnc2m8NgHQT3j-bxFxbC4VYydI8REg3HykUa5p0qWpCw8a_E4l',
      'http://d2tq98mqfjyz2l.cloudfront.net/image_cache/1338766668159202.jpg',
      'http://img2.hebus.com/hebus_2003/05/09/preview/20030509205352_14.jpg',
      'http://farm9.staticflickr.com/8165/7516039824_02c7cf2a95.jpg',
      'http://img.photobucket.com/albums/v620/karli_meaghan/christmaswish_wv_sm.png',
      'http://pclayer.com/images/2012/05/emma-watson-2011-Wallpaper-1.jpg',
      'http://behance.vo.llnwd.net/profiles/58036/projects/330673/0580361258650119.png'
    ]

    project_name.length.times do |n|
      description = Faker::Lorem.sentence(5)
      item = user2.items.create!(title: project_name[n],
      description: description)
      photo = item.photos.create!(
      caption: Faker::Lorem.sentence(3),
      photo_url: cover_photo[n]
      )
    end

    puts "Creating sample notifications for Kudos"
    user2.kudo_item_ids=[user.items.find_first()]


  end

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
    users.shift
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
    Widget.create(creator_id: users.sample.id, thumbnail:"http://cl.ly/image/3i2p3q2f2N1e", name: "Clock")
    #end
    # create one for first user
    #   widgets = Widget.all()
    #   UsersWidgets.create(user_id: users[1].id,
    #                       widget_id: widgets.sample.id,
    #                       config_json: Faker::Lorem.sentence(3))
    #   20.times do
    #     UsersWidgets.create(user_id: users.sample.id,
    #                         widget_id: widgets.sample.id,
    #                         config_json: Faker::Lorem.sentence(3))
    #   end
  end
end
