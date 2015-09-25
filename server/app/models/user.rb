class User < ActiveRecord::Base

  include Apiway::Model


  has_many :messages, inverse_of: :user


  validates :name,  presence: { message: "blank" }, length: { in: 3..30, message: "length" }
  validates :token, length: { is: 32 }


  after_initialize do
    self.token ||= generate_token
  end

  def generate_token
    begin
      token = SecureRandom.hex 16
    end while User.exists? token: token
    token
  end


end
