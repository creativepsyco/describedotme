class AddKudoCountToItem < ActiveRecord::Migration
  def change
    add_column :items, :kudos_count, :integer, :default => 0
  end
end
