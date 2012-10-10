class FixPhotoDescName < ActiveRecord::Migration
  def change
    rename_column :photos, :descriptin, :description
  end
end
