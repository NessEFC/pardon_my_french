class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.references :user, foreign_key: true
      t.string :french_word

      t.timestamps
    end
  end
end
