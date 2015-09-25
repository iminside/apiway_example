class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.belongs_to :user
      t.text       :text

      t.timestamps null: true

      t.index :user_id
    end
  end
end
