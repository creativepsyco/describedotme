# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :users_widget, :class => 'UsersWidgets' do
    user_id 1
    widget_id 1
    config_json "MyString"
  end
end
