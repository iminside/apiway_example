class CurrentUserResource < ApplicationResource

  include Apiway::Resource

  depend_on User


  access do
    auth?
  end


  data do

    {
      id:    current_user.id,
      name:  current_user.name,
      token: current_user.token
    }

  end


end
