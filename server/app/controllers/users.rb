class UsersController < ApplicationController

  include Apiway::Controller


  action :auth_by_name do

    begin
      user = User.find_or_create_by! name: params[ :name ]
    rescue Exception => e
      error e.record.errors.full_messages
    else
      client[ :user_id ] = user.id
      user.token
    end

  end


  action :auth_by_token do

    begin
      user = User.find_by! token: params[ :token ]
    rescue
    else
      client[ :user_id ] = user.id
    end

  end


end
