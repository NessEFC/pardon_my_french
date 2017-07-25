class AddPersonalConnectionToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :personal_connection, :text
  end
end
