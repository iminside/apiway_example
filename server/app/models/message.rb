class Message < ActiveRecord::Base

  include Apiway::Model


  belongs_to :user, inverse_of: :messages


  validates :text,  presence: { message: "blank" }, length: { in: 1..300, message: "length" }


end
