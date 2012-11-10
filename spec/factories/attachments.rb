# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :attachment do
    description "MyString"
    url "MyString"
    thumbnail_url "MyString"
    creator_id 1
    type ""
    alt "MyString"
    item_id 1
  end
end
