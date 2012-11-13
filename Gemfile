source 'https://rubygems.org'

gem 'rails', '3.2.8'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'mysql2'
group :assets do
  #gem 'bootstrap-sass', '~> 2.1.1.0'
  gem 'sass-rails',   '~> 3.1'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
  gem 'bootstrap-sass', '2.1.1.0'
end

gem 'jquery-rails'
gem "rspec-rails", ">= 2.10.1", :group => [:development, :test]
gem "factory_girl_rails", ">= 3.3.0", :group => [:development, :test]
gem "email_spec", ">= 1.2.1", :group => :test
gem "cucumber-rails", ">= 1.3.0", :group => :test, :require => false
gem "capybara", ">= 1.1.2", :group => :test
gem "database_cleaner", ">= 0.7.2", :group => :test
gem "launchy", ">= 2.1.0", :group => :test
gem "devise", ">= 2.1.0"
gem "cancan"
gem "faker", "1.0.1"
gem "paperclip", "~> 3.0"

# Backbone js
# More https://github.com/codebrew/backbone-rails
gem 'backbone-on-rails'

# Bootstrap Rails
# gem "bootstrap-sass", "2.0.0"

# zip
gem "rubyzip", "~> 0.9.9"

# this group is for testing only
# delete them if cannot install
gem 'guard-rspec'
gem 'simplecov'
group :test do
	gem 'spork', '~> 0.9.0.rc'
  gem 'spork-testunit'
  gem 'guard-spork'
  gem 'guard-test'
end
