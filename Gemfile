source 'https://rubygems.org'

# Attempt to get Heroku's asset pipeline to work with Rails 4
group :production do
  gem 'rails_12factor'
end

group :test do
  gem 'simplecov', '~> 0.7.1', :require => false #Gives percentage of code with test coverage
  gem 'factory_girl_rails', '~> 4.0'
end


gem 'rmagick' # Ruby version of the ImageMagick library.  Needed for image manipulation (resizing)

gem 'rekognize' #Image analysis library
gem 'json' #Needed for data interaction

gem 'pry'
gem 'pry-rails'

# Image uploading stuff
gem 'carrierwave'
gem 'fog', "~> 1.3.1"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.2'

# Use postgresql as the database for Active Record
gem 'pg'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

gem 'devise'

gem 'rspec-rails'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

# Use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.1.2'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
