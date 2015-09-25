class OnlineResource < ApplicationResource

  include Apiway::Resource

  depend_on Online


  data do

    Online.value

  end


end
