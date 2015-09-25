class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string  :token,  limit: 32
      t.string  :name,   limit: 100

      t.timestamps null: true

      t.index :token, unique: true
    end
  end
end
