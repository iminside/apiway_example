class Online

  include Apiway::Model


  def self.value
    Apiway::Client.all.size
  end


end
