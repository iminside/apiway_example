module Apiway

  class Client


    on_connected do
      Online.sync
    end

    on_message do |message|

    end

    on_disconnected do
      Online.sync
    end


  end

end
